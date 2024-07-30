import React from "react";
import "./index.css"; // Tailwind CSS를 포함한 파일
import Test from "./components/Test";
import Feed from "./components/Feed";
import Navigation from "./components/Navigation";
import Review from "./components/Review";
import QnA from "./components/QnA";
import MyPage from "./components/MyPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ReviewForm from "./components/ReviewForm";
import FeedForm from "./components/FeedForm";
import {
  AiOutlineHome,
  AiOutlineExperiment,
  AiOutlineAppstore,
  AiOutlineForm,
  AiOutlineQuestionCircle,
  AiOutlineUser,
} from "react-icons/ai";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <nav className="fixed top-0 left-0 h-full flex flex-col space-y-4 p-4 bg-white shadow-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-300 text-black p-4 rounded-md flex items-center"
                : "bg-gray-800 text-white p-4 rounded-md flex items-center hover:bg-gray-700 transition-colors"
            }
          >
            <AiOutlineHome className="mr-2" /> Home
          </NavLink>
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
        <main className="flex-1 pt-16 p-6 bg-gray-100 ml-64">
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/form" element={<FeedForm />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/review" element={<Review />} />
            <Route path="/review/form" element={<ReviewForm />} />
            <Route path="/qna" element={<QnA />} />
            <Route path="/myPage" element={<MyPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
