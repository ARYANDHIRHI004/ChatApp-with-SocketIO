import React, { useState, useRef, useEffect } from "react";

const users = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      isOnline: true,
      lastMessage: "Hey! Are we meeting today?",
      lastMessageTime: "2:45 PM",
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      isOnline: false,
      lastMessage: "Thanks for the update.",
      lastMessageTime: "1:10 PM",
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "https://i.pravatar.cc/150?img=3",
      isOnline: true,
      lastMessage: "Let’s finish the project.",
      lastMessageTime: "Yesterday",
    },
    {
      id: 4,
      name: "Diana Prince",
      avatar: "https://i.pravatar.cc/150?img=4",
      isOnline: false,
      lastMessage: "Call me when you're free.",
      lastMessageTime: "Monday",
    },
  ];

const ChatApp = ({userId}) => {

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋", sender: "other" },
    { id: 2, text: "Hi! How are you?", sender: "me" },
  ]);

  const [input, setInput] = useState("");
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
      sender: "me",
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Dummy reply after 1 second
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Got your message 👍",
          sender: "other",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm">
        <h2 className="font-semibold text-lg">{
          users.find((user) => {return user.id === userId}).name    
        }</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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