import React, { useState, useRef, useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import socket from "../services/socker";

const ChatApp = ({ userId }) => {
  const { authUser, allUsers } = useAuthStore();
  console.log(userId)

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState("");

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: authUser.data._id,
      receiver: userId,
    };

    socket.emit("message", newMessage);

    setMessages((prev) => [...prev, newMessage]);

    setInput("");
  };

  useEffect(() => {
    socket.on("incomingMsg", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing", (data) => {
      if (data.sender === userId) {       
        setTyping("Typing...");
      }
    });
    socket.on("stopTyping", () => {
      setTyping(null);
    });

    return () => {
      socket.off("incomingMsg");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [userId]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  let typingTimeout;

  const sendIndicator = (value) => {
    setInput(value);

    socket.emit("typing", {
      sender: authUser.data._id,
      receiver: userId,
    });

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", {
        sender: authUser.data._id,
        receiver: userId,
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm">
        <h2 className="font-semibold text-lg">
          {allUsers?.data?.find((user) => user._id === userId)?.fullname}
        </h2>
        <p>{typing}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          if (userId === msg.receiver) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-lg p-2">
                  {msg.text}
                </div>
              </div>
            );
          } else if (userId === msg.sender) {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-2">
                  {msg.text}
                </div>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => sendIndicator(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
