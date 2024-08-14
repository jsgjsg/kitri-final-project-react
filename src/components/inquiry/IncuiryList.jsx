// InquiryList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api"; // 설정한 axios 인스턴스

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await api.get("/inquiry");
        setInquiries(response.data);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">문의</h1>
        <Link
          to="/create-inquiry"
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          작성
        </Link>
      </div>
      <ul className="space-y-4">
        {inquiries.map((inquiry) => (
          <li
            key={inquiry.id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <Link
              to={`/inquiry/${inquiry.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {inquiry.title}
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(inquiry.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InquiryList;
