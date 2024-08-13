import React, { useState } from "react";
import "./index.css"; // Tailwind CSS 포함
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import {
  AiOutlineAppstore,
  AiOutlineGlobal,
  AiOutlineForm,
  AiOutlineQuestionCircle,
  AiOutlineUser,
} from "react-icons/ai";

import MyPage from "./components/pages/MyPage";
import Login from "./components/pages/LoginPage";
import Signup from "./components/pages/SignupPage";
import AccountDeletion from "./components/AccountDeletion";
import Feed from "./components/pages/FeedPage";
import Navigation from "./components/Navigation";
import Review from "./components/pages/ReviewPage";
import Qna from "./components/pages/QnaPage";
import ReviewForm from "./components/review/ReviewForm";
import FeedForm from "./components/feed/FeedForm";
import QnaForm from "./components/qna/QnaForm";
import QnaDetail from "./components/qna/QnaDetail";
import FriendsPage from "./components/pages/FriendsPage";
import EditProfilePage from "./components/pages/EditProfilePage";
import SocketTest from "./components/SocketTest";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <main className="flex-1 p-6 bg-gray-100 flex justify-center items-center pt-20">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/delete-account" element={<AccountDeletion />} />
            <Route path="/edit-account" element={<EditProfilePage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/form/" element={<FeedForm />} />
            <Route path="/feed/form/:id" element={<FeedForm />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/review" element={<Review />} />
            <Route path="/review/form/" element={<ReviewForm />} />
            <Route path="/review/form/:id" element={<ReviewForm />} />
            <Route path="/qna" element={<Qna />} />
            <Route path="/qna/form" element={<QnaForm />} />
            <Route path="/qna/detail/:qaId" element={<QnaDetail />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/scTest" element={<SocketTest />} />
          </Routes>
        </main>

        {/* 내비게이션 바 */}
        <nav
          className={`fixed top-0 right-0 h-full flex flex-col space-y-4 p-4 bg-white shadow-lg rounded-l-lg transform ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform z-40`}
        >
          <NavLink
            to="/scTest"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-300 text-black p-4 flex items-center justify-center w-full"
                : "bg-gray-800 text-white p-4 flex items-center justify-center w-full hover:bg-gray-700 transition-colors"
            }
          >
            <AiOutlineAppstore className="text-2xl mr-2" />
            <span className="flex-grow">채팅 Test</span>
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-300 text-black p-4 flex items-center justify-center w-full"
                : "bg-gray-800 text-white p-4 flex items-center justify-center w-full hover:bg-gray-700 transition-colors"
            }
          >
            <AiOutlineAppstore className="text-2xl mr-2" />
            <span className="flex-grow">Feed</span>
          </NavLink>
          <NavLink
            to="/navigation"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-300 text-black p-4 flex items-center justify-center w-full"
                : "bg-gray-800 text-white p-4 flex items-center justify-center w-full hover:bg-gray-700 transition-colors"
            }
          >
            <AiOutlineGlobal className="text-2xl mr-2" />
            <span className="flex-grow">Navigation</span>
          </NavLink>
          <NavLink
            to="/review"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-300 text-black p-4 flex items-center justify-center w-full"
                : "bg-gray-800 text-white p-4 flex items-center justify-center w-full hover:bg-gray-700 transition-colors"
            }
          >
            <AiOutlineForm className="text-2xl mr-2" />
            <span className="flex-grow">Review</span>
          </NavLink>
          <NavLink
            to="/qna"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-300 text-black p-4 flex items-center justify-center w-full"
                : "bg-gray-800 text-white p-4 flex items-center justify-center w-full hover:bg-gray-700 transition-colors"
            }
          >
            <AiOutlineQuestionCircle className="text-2xl mr-2" />
            <span className="flex-grow">Dr.QnA</span>
          </NavLink>
          <NavLink
            to="/myPage"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-300 text-black p-4 flex items-center justify-center w-full"
                : "bg-gray-800 text-white p-4 flex items-center justify-center w-full hover:bg-gray-700 transition-colors"
            }
          >
            <AiOutlineUser className="text-2xl mr-2" />
            <span className="flex-grow">MyPage</span>
          </NavLink>
        </nav>

        {/* 토글 버튼 */}
        <button
          className={`fixed top-80 transform ${
            isNavOpen ? "right-[11rem]" : "right-1"
          } bg-gray-800 text-white px-2 py-2 shadow-lg hover:bg-gray-700 transition-all z-50`}
          onClick={toggleNav}
        >
          {/* 토글 상태에 따라 아이콘 변경 */}
          {isNavOpen ? ">" : "<"}
        </button>
      </div>
    </Router>
  );
}

export default App;
