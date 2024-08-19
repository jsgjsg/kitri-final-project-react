import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"; // 설정한 axios 인스턴스

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await api.get("/inquiry/page", {
          params: {
            page: currentPage,
            size: pageSize,
          },
        });
        setInquiries(response.data.inquiry);
        setTotalInquiries(response.data.total);
      } catch (error) {
        console.error(
          "Error fetching inquiries:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchInquiries();
  }, [currentPage, pageSize]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalInquiries / pageSize)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleInquiryClick = (id) => {
    navigate(`/inquiry/${id}`);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 mr-4">
          문의 목록
        </h1>
        <Link to="/create-inquiry" className="flex items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kitri-final-project.appspot.com/o/images%2Fmungnu.png?alt=media&token=ce1ea880-0a3e-45f8-b9ec-83a583bd9b2a"
            alt="Create Inquiry"
            className="w-24 h-24 object-contain cursor-pointer hover:opacity-90 transition duration-300 ease-in-out"
          />
        </Link>
      </div>
      <ul className="space-y-4">
        {inquiries.map((inquiry) => (
          <li
            key={inquiry.id}
            onClick={() => handleInquiryClick(inquiry.id)}
            className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out">
              {inquiry.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(inquiry.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-full shadow-sm hover:bg-gray-400 transition duration-300 ease-in-out disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm text-gray-700">
          페이지 {currentPage} / {Math.ceil(totalInquiries / pageSize)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(totalInquiries / pageSize)}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-full shadow-sm hover:bg-gray-400 transition duration-300 ease-in-out disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default InquiryList;
