import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineExperiment,
  AiOutlineAppstore,
  AiOutlineForm,
  AiOutlineQuestionCircle,
  AiOutlineUser,
} from "react-icons/ai";

const RightSidebar = () => {
  return (
    <nav className="fixed top-0 right-0 h-full flex flex-col space-y-4 p-4 bg-white shadow-lg">
      <NavLink
        to="/test"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-300 text-black p-4 rounded-md flex items-center"
            : "bg-gray-800 text-white p-4 rounded-md flex items-center hover:bg-gray-700 transition-colors"
        }
      >
        <AiOutlineExperiment className="mr-2" /> Test
      </NavLink>
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-300 text-black p-4 rounded-md flex items-center"
            : "bg-gray-800 text-white p-4 rounded-md flex items-center hover:bg-gray-700 transition-colors"
        }
      >
        <AiOutlineAppstore className="mr-2" /> Feed
      </NavLink>
      <NavLink
        to="/navigation"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-300 text-black p-4 rounded-md flex items-center"
            : "bg-gray-800 text-white p-4 rounded-md flex items-center hover:bg-gray-700 transition-colors"
        }
      >
        <AiOutlineAppstore className="mr-2" /> Navigation
      </NavLink>
      <NavLink
        to="/review"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-300 text-black p-4 rounded-md flex items-center"
            : "bg-gray-800 text-white p-4 rounded-md flex items-center hover:bg-gray-700 transition-colors"
        }
      >
        <AiOutlineForm className="mr-2" /> Review
      </NavLink>
      <NavLink
        to="/qna"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-300 text-black p-4 rounded-md flex items-center"
            : "bg-gray-800 text-white p-4 rounded-md flex items-center hover:bg-gray-700 transition-colors"
        }
      >
        <AiOutlineQuestionCircle className="mr-2" /> Dr.QnA
      </NavLink>
      <NavLink
        to="/myPage"
        className={({ isActive }) =>
          isActive
            ? "bg-yellow-300 text-black p-4 rounded-md flex items-center"
            : "bg-gray-800 text-white p-4 rounded-md flex items-center hover:bg-gray-700 transition-colors"
        }
      >
        <AiOutlineUser className="mr-2" /> MyPage
      </NavLink>
    </nav>
  );
};

export default RightSidebar;
