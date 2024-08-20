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
        src="https://firebasestorage.googleapis.com/v0/b/kitri-final-project.appspot.com/o/images%2F--unscreen.gif?alt=media&token=997c23fc-58fb-4d3b-930d-1a1548030936"
        alt="Decorative"
        className="fixed bottom-4 left-4 w-24 h-24 object-cover" // fixed로 전체 화면에서 위치 지정
      />
    </div>
  );
}

export default InquiryList;
