import React, { useState } from "react";
import InquiryItem from "./InquiryItem";

function InquiryList({ inquiries, handleInquiryClick }) {
  const [currentImage, setCurrentImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/kitri-final-project.appspot.com/o/images%2F%EB%A8%80%EC%98%A4.png?alt=media&token=44bcda8a-5ec9-4aed-8a2e-e833bd5d5824"
  );

  const handleImageClick = () => {
    // 변경할 이미지 URL
    const temporaryImage =
      "https://firebasestorage.googleapis.com/v0/b/kitri-final-project.appspot.com/o/images%2F%EB%A8%80%EC%98%A4%20%EB%A6%AC%EC%A7%80%EA%B0%9C.png?alt=media&token=e9a0f445-5b1a-453a-b476-475b6c8802bb";

    // 이미지 변경
    setCurrentImage(temporaryImage);

    // 2초 후 원래 이미지로 복원
    setTimeout(() => {
      setCurrentImage(
        "https://firebasestorage.googleapis.com/v0/b/kitri-final-project.appspot.com/o/images%2F%EB%A8%80%EC%98%A4.png?alt=media&token=44bcda8a-5ec9-4aed-8a2e-e833bd5d5824"
      );
    }, 2000);
  };

  return (
    <div className="relative">
      <ul className="space-y-4">
        {inquiries.map((inquiry) => (
          <InquiryItem
            key={inquiry.id}
            inquiry={inquiry}
            handleInquiryClick={handleInquiryClick}
          />
        ))}
      </ul>
      {/* 이미지 추가 */}
      <img
        src={currentImage}
        alt="Decorative"
        className="fixed bottom-4 left-4 w-24 h-24 object-cover cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105"
        onClick={handleImageClick}
      />
    </div>
  );
}

export default InquiryList;
