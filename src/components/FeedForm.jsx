import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";

const FeedForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      setTitle("Sample Title");
      setContent("Sample Content");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      console.log("Updating review with ID:", id);
    } else {
      console.log("Adding new review");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 w-80 mx-auto border-2 border-black rounded-md shadow-md bg-white font-doodle">
      <h2 className="text-3xl font-bold mb-4">
        {id ? "Edit Form" : "Add Form"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border-2 border-black rounded-md w-full"
            required
          />
        </div>
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
