import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";
import api from "../api/api";

const FeedForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [animal, setAnimal] = useState("cat");
  const [hashtags, setHashtags] = useState("");
  const [hashtagsList, setHashtagsList] = useState([]);

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

  useEffect(() => {
    if (id) {
      setContent("Sample Content");
      setImage(null);
      setAnimal("cat");
      setHashtagsList(["sampleHashtag1", "sampleHashtag2"]);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      console.log("Updating review with ID:", id);
    } else {
      console.log("Adding new review");
    }

    const feed = {userId: user.id, content, animal, image, hashtagsList};

    api.post("/feeds", feed)
    .then((response) => {
      console.log("Content:", content);
      console.log("Image:", image);
      console.log("animal:", animal);
      console.log("Hashtags:", hashtagsList);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
    setHashtagsList(hashtagsList.filter(tag => tag !== hashtag));
  };

  return (
    <div className="p-6 w-80 mx-auto border-2 border-black rounded-md shadow-md bg-white font-doodle">
      <h2 className="text-3xl font-bold mb-4">
        {id ? "Edit Form" : "Add Form"}
      </h2>
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
