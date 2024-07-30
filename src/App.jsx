import "./index.css"; // Tailwind CSS를 포함한 파일
import Test from "./components/Test";
import Feed from "./components/Feed";
import Navigation from "./components/Navigation";
import Review from "./components/Review";
import QnA from "./components/QnA";
import MyPage from "./components/MyPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReviewForm from "./components/ReviewForm";
import FeedForm from "./components/FeedForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-gray-800 text-white fixed w-full top-0 left-0 z-10 shadow-md">
          <ul className="flex justify-around p-4 space-x-6">
            <li><Link to="/dashboard" className="hover:text-yellow-300 transition-colors">Home</Link></li>
            <li><Link to="/test" className="hover:text-yellow-300 transition-colors">Test</Link></li>
            <li><Link to="/feed" className="hover:text-yellow-300 transition-colors">Feed</Link></li>
            <li><Link to="/navigation" className="hover:text-yellow-300 transition-colors">Navigation</Link></li>
            <li><Link to="/review" className="hover:text-yellow-300 transition-colors">Review</Link></li>
            <li><Link to="/qna" className="hover:text-yellow-300 transition-colors">Dr.QnA</Link></li>
            <li><Link to="/myPage" className="hover:text-yellow-300 transition-colors">MyPage</Link></li>
          </ul>
        </nav>

        <main className="flex-1 pt-16 p-6 bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
