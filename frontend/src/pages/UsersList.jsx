import React, { useEffect, useState } from "react";
import ChatApp from "../components/Chat";
import useAuthStore from "../stores/useAuthStore";
import socket from "../services/socker";

const UsersList = () => {

  const [myStatus, setMystatus] = useState("offline");

  const {getAllUsers, allUsers, isFatchingAllUsers, authUser} = useAuthStore()

  console.log(allUsers)


useEffect(() => {
  if (!authUser?.data?._id) return;

  socket.emit("setup", authUser.data._id);

  socket.on("connected", () => {
    setMystatus("online");
  });

  socket.on("disconnected", () => {
    setMystatus("offline");
  });

  return () => {
    socket.off("connected");
  };
}, [authUser]);


  const [activeUserId, setActiveUserId] = useState(null);
  const [indexOfUser, setIndexOfUser] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chats {" "+myStatus}</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {allUsers?.data?.map((user, index) => (
            <div
              key={user._id}
              onClick={() => setActiveUserId(user._id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors duration-200 
                ${
                  activeUserId === user._id
                    ? "bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar.url}
                  alt={user.fullname}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white 
                    ${myStatus==="online" ? "bg-green-500" : "bg-gray-400"}`}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 truncate">
                    {user.fullname}
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