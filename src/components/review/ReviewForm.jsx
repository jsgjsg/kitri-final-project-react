import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FaPlus,
  FaTimes,
  FaTrash,
  FaStar,
  FaRegStar,
  FaArrowLeft,
} from "react-icons/fa";
import api from "../../api/api";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

const ReviewForm = ({ onClose, isEditing = false, review }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState({});
  const [item, setItem] = useState("");
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [tip, setTip] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [repurchase, setRepurchase] = useState("");
  const [satisfaction, setSatisfaction] = useState(0);
  const [animal, setAnimal] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    if (isEditing && review) {
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
  }, [isEditing, review]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      // FileReader를 사용하여 이미지 미리보기를 설정합니다.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedImage);
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
        resolve(imageUrl);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImageUrl = await handleUpload();

    const reviewData = {
      userId: user.id,
      item,
      good,
      bad,
      tip,
      image: uploadedImageUrl || imageUrl,
      repurchase,
      satisfaction,
      animal,
      category,
    };

    if (isEditing) {
      api
        .put(`/reviews/${review.id}`, reviewData)

        .then((response) => {
          console.log(reviewData);
          console.log(response);
          alert("글 수정 완료");
          onClose();
          navigate("/review");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      api
        .post(`/reviews`, reviewData)
        .then(() => {
          alert("글 작성 완료");
          onClose();
          navigate("/review");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      api
        .delete(`/reviews/${review.id}`)
        .then(() => {
          alert("리뷰가 삭제되었습니다.");
          onClose();
          navigate("/review");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePrevPage = () => {
    setCurrentPage(1);
  };

  const renderStars = (level) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        onClick={(e) => {
          e.preventDefault(); // 폼 제출 방지
          setSatisfaction(i + 1);
        }}
      >
        {i < level ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
      </button>
    ));
  };

  return (
    <div className="p-4 w-80 mx-auto border-2 border-black rounded-md shadow-md bg-white font-doodle">
      {currentPage === 1 && (
        <>
          <div className="flex items-center justify-between mb-8 ml-5">
            <h2 className="text-2xl font-bold font-sans">
              {isEditing ? "리뷰 수정" : "리뷰 작성"}
            </h2>
            {isEditing && (
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete"
              >
                <FaTrash size={24} />
              </button>
            )}
          </div>

          <label
            htmlFor="image"
            className="block text-lg font-bold text-gray-700 mb-1 font-sans"
          >
            이미지 업로드*
          </label>

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
          <div className="overflow-y-auto max-h-[70vh] mt-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="animal"
                  className="block text-lg font-bold text-gray-700 mb-1 font-sans"
                >
                  반려동물*
                </label>
                <div className="flex justify-between gap-4">
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
                  htmlFor="category"
                  className="block text-lg font-bold text-gray-700 mb-1 font-sans"
                >
                  제품 카테고리*
                </label>
                <div className="flex flex-wrap gap-4">
                  {["사료", "간식", "영양제", "용품", "장난감", "의류"].map(
                    (categoryType) => (
                      <button
                        type="button"
                        key={categoryType}
                        onClick={() => setCategory(categoryType)}
                        className={`px-4 py-2 rounded-full border-2 border-black flex-grow text-sm ${
                          category === categoryType
                            ? "bg-pastel-pink"
                            : "bg-white"
                        }`}
                      >
                        {categoryType}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="item"
                  className="block text-lg font-bold text-gray-700 mb-1 font-sans"
                >
                  제품*
                </label>
                <input
                  id="item"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="mt-2 p-2 border-2 border-black rounded-md w-full text-lg font-sans"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-lg text-black p-2 border-2 border-black rounded-md bg-gray-200 font-sans"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="text-lg text-black p-2 border-2 border-black rounded-md bg-pastel-blue font-sans"
                >
                  다음
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {currentPage === 2 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevPage}
              className="text-sm text-black p-2 rounded-md font-sans"
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="satisfaction"
                  className="block text-lg font-bold text-gray-700 mb-1 font-sans"
                >
                  반려인 만족도*
                </label>
                <div className="flex justify-center gap-2 mt-2">
                  {renderStars(satisfaction)}
                </div>
              </div>

              <div>
                <label
                  htmlFor="good"
                  className="block text-lg font-bold text-gray-700 mt-1 mb-1 font-sans"
                >
                  이런 점이 좋았어요
                </label>
                <textarea
                  id="good"
                  value={good}
                  onChange={(e) => setGood(e.target.value)}
                  className="mt-2 p-2 border-2 border-black rounded-md w-full text-lg font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="bad"
                  className="block text-lg font-bold text-gray-700 font-sans"
                >
                  이런 점이 아쉬워요
                </label>
                <textarea
                  id="bad"
                  value={bad}
                  onChange={(e) => setBad(e.target.value)}
                  className="mt-2 p-2 border-2 border-black rounded-md w-full text-lg font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="tip"
                  className="block text-lg font-bold text-gray-700 font-sans"
                >
                  알아두면 좋을 팁
                </label>
                <textarea
                  id="tip"
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  className="mt-2 p-2 border-2 border-black rounded-md w-full text-lg font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="repurchase"
                  className="block text-lg font-bold text-gray-700 font-sans"
                >
                  재구매를 하실건가요?
                </label>
                <div className="flex justify-between gap-4 mt-4">
                  {["네", "아니오", "고민이에요"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setRepurchase(option)}
                      className={`px-3 py-2 rounded-full border-2 border-black flex-grow text-sm font-sans ${
                        repurchase === option ? "bg-pastel-green" : "bg-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-pastel-blue text-black p-2 rounded-md border-2 border-black flex items-center text-lg font-sans"
                >
                  <FaPlus className="mr-2" />{" "}
                  {isEditing ? "수정하기" : "추가하기"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white p-2 rounded-md border-2 border-black flex items-center text-lg font-sans"
                >
                  <FaTimes className="mr-2" /> 취소
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewForm;
