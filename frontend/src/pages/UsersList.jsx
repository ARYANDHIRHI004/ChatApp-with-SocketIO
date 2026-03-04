import React, { useState } from "react";
import ChatApp from "../components/Chat";

const UsersList = () => {
  const [activeUserId, setActiveUserId] = useState(null);
  const [indexOfUser, setIndexOfUser] = useState(null);

  // ✅ Dummy Users
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chats</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.map((user, index) => (
            <div
              key={user.id}
              onClick={() => setActiveUserId(user.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors duration-200 
                ${
                  activeUserId === user.id
                    ? "bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white 
                    ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 truncate">
                    {user.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {user.lastMessageTime}
                  </span>
                </div>

                <p className="text-sm text-gray-500 truncate">
                  {user.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex items-center justify-center">
        {activeUserId ? (
        //   <h1 className="text-xl font-medium">
        //     Chatting with{" "}
        //     {users.find((u) => u.id === activeUserId)?.name}
        //   </h1>
        <ChatApp userId={activeUserId} />
        ) : (
          <h1 className="text-gray-400 text-lg">
            Select a user to start chatting
          </h1>
        )}
      </div>
    </div>
  );
};

export default UsersList;