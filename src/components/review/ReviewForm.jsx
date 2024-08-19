import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import api from "../../api/api";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

const ReviewForm = ({ onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const review = location.state?.reviewWithUser || {};

  const [user, setUser] = useState({});
  const [item, setItem] = useState("");
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [tip, setTip] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [repurchase, setRepurchase] = useState("");
  const [satisfaction, setSatisfaction] = useState(5);
  const [animal, setAnimal] = useState("cat");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api
      .get(`/users/me`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      setItem(review.item);
      setGood(review.good);
      setBad(review.bad);
      setTip(review.tip);
      setImageUrl(review.image);
      setRepurchase(review.repurchase);
      setSatisfaction(review.satisfaction);
      setAnimal(review.animal);
      setCategory(review.category);
    }
  }, [id, review]);

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
          (snapshot) => {},
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
        resolve();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageName = await handleUpload();

    const review = {
      userId: user.id,
      item,
      good,
      bad,
      tip,
      image: imageName || review.image,
      repurchase,
      satisfaction,
      animal,
      category,
    };

    if (id) {
      api
        .put(`/reviews/${id}`, review)
        .then(() => {
          alert("글 수정 완료");
          onClose();
          navigate("/review");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      api
        .post(`/reviews`, review)
        .then(() => {
          alert("글 작성 완료");
          onClose();
          navigate("/review");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const handleCancel = () => {
    onClose();
    navigate(-1);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      api
        .delete(`/reviews/${id}`)
        .then(() => {
          alert("리뷰가 삭제되었습니다.");
          onClose();
          navigate("/review");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 border-2 border-black rounded-md shadow-md bg-white font-doodle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">
          {id ? "Edit Review" : "Add Review"}
        </h2>
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
      <div className="overflow-y-auto max-h-[60vh]">
        {" "}
        {/* 높이를 60vh로 줄임 */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="repurchase"
                className="block text-lg font-medium text-gray-700"
              >
                Repurchase
              </label>
              <select
                id="repurchase"
                value={repurchase}
                onChange={(e) => setRepurchase(e.target.value)}
                className="mt-1 p-2 border-2 border-black rounded-md w-full"
                required
              >
                <option value="1">재구매</option>
                <option value="0">구매</option>
              </select>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="satisfaction"
                className="block text-lg font-medium text-gray-700"
              >
                Satisfaction
              </label>
              <select
                id="satisfaction"
                value={satisfaction}
                onChange={(e) => setSatisfaction(e.target.value)}
                className="mt-1 p-2 border-2 border-black rounded-md w-full"
                required
              >
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="animal"
              className="block text-lg font-medium text-gray-700"
            >
              Animal
            </label>
            <select
              id="animal"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
              className="mt-1 p-2 border-2 border-black rounded-md w-full"
              required
            >
              <option value="All">All</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="etc">Etc</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border-2 border-black rounded-md w-full"
              required
            >
              <option value="All">전체</option>
              <option value="fodder">사료</option>
              <option value="Snack">간식</option>
              <option value="toy">장난감</option>
              <option value="nutritional">영양제</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="item"
              className="block text-lg font-medium text-gray-700"
            >
              Item
            </label>
            <input
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="mt-1 p-2 border-2 border-black rounded-md w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="good"
              className="block text-lg font-medium text-gray-700"
            >
              Good
            </label>
            <textarea
              id="good"
              value={good}
              onChange={(e) => setGood(e.target.value)}
              className="mt-1 p-2 border-2 border-black rounded-md w-full"
            />
          </div>

          <div>
            <label
              htmlFor="bad"
              className="block text-lg font-medium text-gray-700"
            >
              Bad
            </label>
            <textarea
              id="bad"
              value={bad}
              onChange={(e) => setBad(e.target.value)}
              className="mt-1 p-2 border-2 border-black rounded-md w-full"
            />
          </div>

          <div>
            <label
              htmlFor="tip"
              className="block text-lg font-medium text-gray-700"
            >
              Tip
            </label>
            <textarea
              id="tip"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="mt-1 p-2 border-2 border-black rounded-md w-full"
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
    </div>
  );
};

export default ReviewForm;
