import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import api from "../../api/api";
import { storage } from "../../../firebaseConfig";

const FeedForm = ({ onClose, onOpen, isEditing, feed, feedHashtags }) => {
  const { id } = useParams(); // 피드 ID 가져오기
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [content, setContent] = useState(feed?.content || ""); // 내용 초기화
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(feed?.image || ""); // 이미지 URL 초기화
  const [animal, setAnimal] = useState(feed?.animal || ""); // 동물 종류 초기화
  const [hashtags, setHashtags] = useState(""); // 해시태그 초기화
  const [hashtagsList, setHashtagsList] = useState(
    feedHashtags?.split(" ") || []
  ); // 해시태그 리스트 초기화

  useEffect(() => {
    // 사용자 정보 가져오기
    api
      .get(`/users/me`)
      .then((response) => {
        setUser(response.data);
        if (onOpen) onOpen(); // FeedForm이 열릴 때 부모 컴포넌트에 알림
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    return () => {
      if (onClose) onClose(); // FeedForm이 닫힐 때 부모 컴포넌트에 알림
    };
  }, [onOpen, onClose]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Upload error:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              resolve(downloadURL);
            });
          }
        );
      } else {
        resolve(imageUrl);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedImageUrl = imageUrl;

    if (image) {
      try {
        uploadedImageUrl = await handleUpload();
      } catch (error) {
        alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }
    }

    const reqHashtags = hashtagsList.map((hashtag) => ({ hashtag }));

    const feedData = {
      feedWithUser: {
        content,
        animal,
        image: uploadedImageUrl,
      },
      feedHashtags: reqHashtags
    };

    console.log(feedData);
    if (isEditing) {
      api
        .put(`/feeds/${feed.id}`, feedData)
        .then(() => {
          alert("글 수정 완료");
          navigate("/feed");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating feed:", error);
        });
    } else {
      api
        .post("/feeds", feedData)
        .then(() => {
          alert("글 작성 완료");
          onClose();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error creating feed:", error);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleHashtagsChange = (e) => {
    setHashtags(e.target.value);
  };

  const addHashtag = () => {
    if (hashtags.trim() && !hashtagsList.includes(hashtags.trim())) {
      setHashtagsList([...hashtagsList, hashtags.trim()]);
      setHashtags("");
    }
  };

  const removeHashtag = (hashtag) => {
    setHashtagsList(hashtagsList.filter((tag) => tag !== hashtag));
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 피드를 삭제하시겠습니까?")) {
      api
        .delete(`/feeds/${feed.id}`)
        .then(() => {
          alert("피드가 삭제되었습니다.");
          onClose();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting feed:", error);
        });
    }
  };

  return (
    <div className="p-4 w-80 mx-auto border-2 border-black rounded-md shadow-md bg-white font-doodle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {isEditing ? "피드 수정" : "피드 작성"}
        </h2>
        {isEditing && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 bg-transparent"
            aria-label="Delete"
          >
            <FaTrash size={24} />
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="mt-2 p-2 border-2 border-black rounded-md w-full text-lg font-sans"
        />
        {imageUrl && (
          <div className="flex justify-center mt-4">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="h-32 w-32 object-contain "
              style={{ margin: "0 auto", display: "block" }}
            />
          </div>
        )}

        <div>
          <label
            htmlFor="animal"
            className="block text-lg font-bold text-gray-700"
          >
            동물
          </label>
          <div className="flex justify-between gap-4 mt-2">
            {["고양이", "강아지", "기타"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setAnimal(type)}
                className={`px-3 py-2 rounded-full border-2 border-black flex-grow text-sm ${
                  animal === type ? "bg-pastel-blue" : "bg-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="hashtags"
            className="block text-lg font-bold text-gray-700"
          >
            해시태그
          </label>
          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              id="hashtags"
              value={hashtags}
              onChange={handleHashtagsChange}
              className="p-2 border-2 border-black rounded-md w-full"
            />
            <button
              type="button"
              onClick={addHashtag}
              className="bg-pastel-red font-bold p-2 rounded-md border-2 border-black"
            >
              +
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {hashtagsList.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
              >
                <span className="mr-2">{tag}</span>
                <FaTimes
                  className="cursor-pointer"
                  onClick={() => removeHashtag(tag)}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-lg font-bold text-gray-700"
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 p-2 border-2 border-black rounded-md w-full"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="text- bg-pastel-blue p-2 rounded-md border-2 border-black flex items-center"
          >
            <FaPlus className="mr-2" /> {isEditing ? "수정" : "작성"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md border-2 border-black flex items-center"
          >
            <FaTimes className="mr-2" /> 취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedForm;
