import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import api from "../api/api";

const FeedForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const feed = location.state?.feed || {};

  // 상태 변수 정의
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [content, setContent] = useState(""); // 피드 내용 상태변수
  const [image, setImage] = useState(null); // 이미지 파일 상태변수
  const [animal, setAnimal] = useState("cat"); // 동물 종류 상태변수
  const [hashtags, setHashtags] = useState(""); // 해시태그 입력 상태변수
  const [hashtagsList, setHashtagsList] = useState([]); // 해시태그 리스트 상태변수

  useEffect(() => {
    // 접속중인 사용자 정보 가져오기
    api
      .get(`/users/me`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  // URL 파라미터에 따라 초기 상태 설정
  useEffect(() => {
    if (id) {
      setContent(feed.content);
      setImage(feed.image);
      setAnimal(feed.animal);
      setHashtagsList([]);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const feed = { userId: user.id, content, animal, image, hashtagsList };

    if (id) {
      console.log("Updating review with ID:", id);

      api
        .put(`/feeds/${id}`, feed)
        .then((response) => {
          console.log("Content:", content);
          console.log("Image:", image);
          console.log("animal:", animal);
          console.log("Hashtags:", hashtagsList);
          console.log(response.data);

          alert("글 수정 완료");
          navigate("/feed");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      console.log("Adding new review");

      api
        .post("/feeds", feed)
        .then((response) => {
          console.log("Content:", content);
          console.log("Image:", image);
          console.log("animal:", animal);
          console.log("Hashtags:", hashtagsList);
          console.log(response.data);
          alert("글 작성 완료");
          navigate("/feed");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  // 폼 취소 처리
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 이미지 변경 처리
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 해시태그 입력 변경 처리
  const handleHashtagsChange = (e) => {
    setHashtags(e.target.value);
  };

  // 해시태그 추가 처리
  const addHashtag = () => {
    if (hashtags.trim() && !hashtagsList.includes(hashtags.trim())) {
      setHashtagsList([...hashtagsList, hashtags.trim()]);
      setHashtags("");
    }
  };

  // 해시태그 제거 처리
  const removeHashtag = (hashtag) => {
    setHashtagsList(hashtagsList.filter((tag) => tag !== hashtag));
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 피드를 삭제하시겠습니까?")) {
      api
        .delete(`/feeds/${id}`)
        .then(() => {
          alert("피드가 삭제되었습니다.");
          navigate("/feed");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  return (
    <div className="p-6 w-80 mx-auto border-2 border-black rounded-md shadow-md bg-white font-doodle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">{id ? "Edit Form" : "Add Form"}</h2>
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 border-2 border-black rounded-md w-full"
            required
          />
        </div>
        <div>
          <label
            htmlFor="animal"
            className="block text-lg font-medium text-gray-700"
          >
            Animal animal
          </label>
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            className="mt-1 p-2 border-2 border-black rounded-md w-full"
            required
          >
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="etc">Etc</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-lg font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 p-2 border-2 border-black rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hashtags"
            className="block text-lg font-medium text-gray-700"
          >
            Hashtags
          </label>
          <div className="flex space-x-2 mt-1">
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
              className="bg-pastel-blue text-black p-2 rounded-md border-2 border-black"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap space-x-2">
            {hashtagsList.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 p-1 rounded-md flex items-center"
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
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-pastel-blue text-black p-2 rounded-md border-2 border-black flex items-center"
          >
            <FaPlus className="mr-2" /> {id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white p-2 rounded-md border-2 border-black flex items-center"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedForm;
