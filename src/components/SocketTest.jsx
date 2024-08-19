import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { FaPaw } from "react-icons/fa"; // 아이콘을 여기에 추가
import exampleImage from "../assets/images/example.jpg";

function SocketTest() {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null); // WebSocket 상태
  const messagesEndRef = useRef(null); // 채팅 메시지 컨테이너에 대한 참조

  useEffect(() => {
    // 접속중인 사용자 정보 가져오기
    api
      .get(`/users/me`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    // WebSocket 연결
    const ws = new WebSocket("ws://localhost:8080/chat");
    setSocket(ws);

    // 서버에서 메시지를 받을 때마다 처리
    const handleMessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    };

    ws.addEventListener("message", handleMessage);

    // 로컬스토리지에서 이전 메시지 불러오기
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);

    // 컴포넌트가 언마운트될 때 WebSocket 닫기
    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.close();
    };
  }, []);

  useEffect(() => {
    // 메시지가 업데이트될 때마다 스크롤을 최하단으로 이동
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket && input.trim()) {
      // socket이 null이 아닌지 확인
      const message = `${user.nickname}: ${input}`;
      socket.send(message);
      setInput("");
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-blue-100 w-full">
      {/* Top Bar */}
      <div className="w-full bg-white shadow-lg fixed top-0 z-10 h-20 flex justify-between items-center px-8">
        <img
          src={exampleImage}
          alt="Example"
          className="w-55 h-14 object-cover mb-2 rounded"
        />
        <FaPaw className="text-4xl text-pink-500 mr-6" /> {/* 아이콘 수정 */}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto pt-24 p-8 h-full flex flex-col">
        <div className="w-full shadow-lg rounded-lg border-2 border-black overflow-hidden flex-grow">
          <div className="bg-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl  font-semibold text-black">Active Chat</h2>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              onClick={clearChat}
            >
              Clear Chat
            </button>
          </div>
          <div className="p-6 h-[500px] overflow-y-auto bg-gray-50 flex flex-col space-y-4">
            <div className="flex-grow">
              {messages.map((msg, index) => {
                const [nickname, ...messageParts] = msg.split(":");
                const message = messageParts.join(":").trim();
                const isCurrentUser = nickname === user.nickname;

                return (
                  <div
                    key={index}
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    } mb-4`}
                  >
                    <div
                      className={`p-4 rounded-lg shadow-md ${
                        isCurrentUser
                          ? "bg-blue-100 border border-blue-500"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      <div
                        className={`font-semibold ${
                          isCurrentUser ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {nickname}
                      </div>
                      <div
                        className={`mt-2 ${
                          isCurrentUser ? "text-gray-800" : "text-gray-700"
                        }`}
                      >
                        {message}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t border-gray-300 bg-white">
            <input
              type="text"
              className="flex-grow p-4 border-none outline-none rounded-bl-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message here..."
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 font-semibold rounded-br-lg hover:bg-blue-600 transition-colors"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocketTest;
