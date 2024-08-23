import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { FaPaw, FaUserCircle } from "react-icons/fa"; // 아이콘 추가
import exampleImage from "../assets/images/example.jpg";

function PrivateChat() {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null); // WebSocket 상태
  const messagesEndRef = useRef(null); // 채팅 메시지 컨테이너에 대한 참조
  const [roomId, setRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);

  // // 채팅방 목록 (가짜 데이터)
  // const chatRooms = [
  //   { id: 1, name: "Room 1" },
  //   { id: 2, name: "Room 2" },
  //   { id: 3, name: "Room 3" },
  // ];

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

    api.get(`/chat/rooms`)
    .then((response) => {
      setChatRooms(response.data);
      console.log(response.data);
    })
    .catch((error) => console.error("Error messages: ", error));

  }, []);

  useEffect(() => {
    // 이전 메시지 불러오기
    api
    .get(`/chat/${roomId}/messages`)
    .then((response) => {
      setMessages(response.data.map(msg => `${msg.sender}: ${msg.message}`));
    })
    .catch((error) => console.error("Error fetching chat messages: ", error));

    // WebSocket 연결
    const ws = new WebSocket(`ws://localhost:8080/chat/${roomId}`);  // roomId 기반 연결
    setSocket(ws);

    // 서버에서 메시지를 받을 때마다 처리
    const handleMessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(`chatMessages_${roomId}`, JSON.stringify(updatedMessages)); // roomId 기반 로컬 스토리지
        return updatedMessages;
      });
    };

    ws.addEventListener("message", handleMessage);

    // 컴포넌트가 언마운트될 때 WebSocket 닫기
    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.close();
    };
  }, [roomId]);

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
      const message = `${user.nickname}: ${input}`;
      socket.send(message);
      setInput("");
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`chatMessages_${roomId}`);
  };

  const selectChatRoom = (roomId, chatRoomNum) => {
    setRoomId(roomId);
    setChatRoom(chatRoomNum);
  }

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

      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-lg fixed top-60 left-0 bottom-80 p-4 flex flex-col z-20">
        <button
          className="w-full text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
          onClick={() => selectChatRoom(0, -1)}  // 실제로 채팅방을 선택할 때 이 함수가 호출될 예정
        >
          전체 채팅
        </button>
        <br/>
        <h2 className="text-2xl font-semibold mb-6">친구 목록</h2>
        <ul className="flex-grow overflow-y-auto">
          {chatRooms.map((room, idx) => (
            <li key={room.roomId} className="mb-4">
              <button
                className="w-full text-left bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
                onClick={() => selectChatRoom(room.roomId, idx)}  // 실제로 채팅방을 선택할 때 이 함수가 호출될 예정
              >
                {room.nickname}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`max-w-2xl mx-auto pt-24 p-8 h-full flex-1 ml-1/5 pt-24 p-8 ${roomId === null ? 'flex items-center justify-center' : 'flex flex-col'}`}>
        {roomId === null ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Select a Chat Room</h2>
            <p className="mt-4 text-gray-600">Please select a chat room from the sidebar to start chatting.</p>
          </div>
        ) : (
          <div className="w-full shadow-lg rounded-lg border-2 border-black overflow-hidden flex-grow">
            <div className="bg-gray-200 p-6 flex justify-between items-center">
              <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full border-4 border-black">
              {chatRooms[chatRoom]?.image ? (
                <img
                  src={chatRooms[chatRoom].image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-500" />
              )}
            </div>
              <h2 className="text-2xl font-semibold text-black">{chatRooms[chatRoom]?.nickname || "전체 채팅"}</h2>
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
        )}
      </div>
    </div>
  );
}

export default PrivateChat;
