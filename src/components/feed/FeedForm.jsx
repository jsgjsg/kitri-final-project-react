import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import api from "../../api/api";
import { storage } from "../../../firebaseConfig";

const FeedForm = ({ onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const feed = location.state?.feedWithUser || {};
  const feedHashtags = location.state?.feedHashtags || [];

  const [user, setUser] = useState({});
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [animal, setAnimal] = useState("cat");
  const [hashtags, setHashtags] = useState("");
  const [hashtagsList, setHashtagsList] = useState([]);

  useEffect(() => {
    api
      .get(`/users/me`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      setContent(feed.content);
      setImageUrl(feed.image);
      setAnimal(feed.animal);
      setHashtagsList(feedHashtags.map((tag) => tag.hashtag));
    }
  }, [id, feed, feedHashtags]);

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
          (snapshot) => {
            console.log("Upload is in progress...");
          },
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
        console.error("Image upload failed:", error);
        alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }
    }

    const reqHashtags = hashtagsList.map((hashtag) => ({ hashtag }));

    const feedData = {
      feedWithUser: {
        userId: user.id,
        content,
        animal,
        image: uploadedImageUrl,
      },
      feedHashtags: reqHashtags,
    };

    if (id) {
      api
        .put(`/feeds/${id}`, feedData)
        .then((response) => {
          alert("글 수정 완료");
          navigate("/feed");
        })
        .catch((error) => {
          console.error("Error updating feed:", error);
        });
    } else {
      api
        .post("/feeds", feedData)
        .then((response) => {
          alert("글 작성 완료");
          onClose();
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
        .delete(`/feeds/${id}`)
        .then(() => {
          alert("피드가 삭제되었습니다.");
          onClose();
        })
        .catch((error) => {
          console.error("Error deleting feed:", error);
        });
    }
  };

  return (
    <div className="p-8 w-full max-w-xl mx-auto rounded-md shadow-md bg-white font-sans">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{id ? "피드 수정" : "피드 작성"}</h2>
        {id && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
            aria-label="Delete"
          >
            <FaTrash size={24} />
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="image"
            className="block text-lg font-bold text-gray-700"
          >
            이미지
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-2 p-2 border-2 border-black rounded-md w-full"
          />
        </div>

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
            className="text-black bg-pastel-blue p-2 rounded-md border-2 border-black flex items-center"
          >
            <FaPlus className="mr-2" /> {id ? "수정" : "작성"}
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
