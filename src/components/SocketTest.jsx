import React, { useEffect, useState } from 'react';
import api from '../api/api';

function SocketTest() {
  const [user, setUser] = useState({}); // 사용자 정보 상태변수
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null); // WebSocket 상태

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
    const ws = new WebSocket('ws://localhost:8080/chat');
    setSocket(ws);

    // 서버에서 메시지를 받을 때마다 처리
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // 컴포넌트가 언마운트될 때 WebSocket 닫기
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) { // socket이 null이 아닌지 확인
      const message = `${user.nickname}: ${input}`;
      socket.send(message);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Chat Room</h1>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="border-b border-gray-300 p-4 bg-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Active Chat</h2>
        </div>
        <div className="p-4 h-80 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => {
            const [nickname, ...messageParts] = msg.split(':');
            const message = messageParts.join(':').trim();
            const isCurrentUser = nickname === user.nickname;

            return (
              <div key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
                <div
                  className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} space-y-2`}
                >
                  <div className={`font-bold ${isCurrentUser ? 'text-blue-600' : 'text-gray-600'}`}>
                    {nickname}
                  </div>
                  <div
                    className={`p-2 rounded-lg shadow-sm ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex border-t border-gray-300">
          <input
            type="text"
            className="flex-grow border-t border-gray-300 p-4 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message here..."
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 font-semibold border-t border-gray-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocketTest;
