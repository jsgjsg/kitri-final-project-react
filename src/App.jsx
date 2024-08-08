import React from "react";
import "./index.css"; // Tailwind CSS 포함
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";
import Feed from "./components/Feed";
import Navigation from "./components/Navigation";
import Review from "./components/Review";
import Qna from "./components/QnA";
import MyPage from "./components/MyPage";
import Login from "./components/Login";
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
  AiOutlineGlobal,
  AiOutlineForm,
  AiOutlineQuestionCircle,
  AiOutlineUser,
} from "react-icons/ai";
import QnaForm from "./components/QnaForm";
import QnaDetail from "./components/QnaDetail";
import Signup from "./components/Signup";
import AccountDeletion from "./components/AccountDeletion";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <main className="flex-1 p-6 bg-gray-100 flex justify-center items-center pt-20">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/delete-account" element={<AccountDeletion />} />
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
          </Routes>
        </main>
        <nav className="fixed top-80 right-10 flex flex-col space-y-4 p-4 bg-white shadow-lg rounded-lg">
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
      </div>
    </Router>
  );
}

export default App;
