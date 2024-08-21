// src/InquiryList.js
import React from "react";
import InquiryItem from "./InquiryItem";

function InquiryList({ inquiries, handleInquiryClick }) {
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
        src="https://firebasestorage.googleapis.com/v0/b/kitri-final-project.appspot.com/o/images%2F%EB%A8%80%EC%98%A4.png?alt=media&token=44bcda8a-5ec9-4aed-8a2e-e833bd5d5824"
        alt="Decorative"
        className="fixed bottom-4 left-4 w-24 h-24 object-cover" // fixed로 전체 화면에서 위치 지정
      />
    </div>
  );
}

export default InquiryList;
