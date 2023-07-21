// Chat.js
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing the user profile icon
import ScrollToBottom from "react-scroll-to-bottom";
import ChatInput from "./chatInput";

function Chat({ socket, username, room }) {
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (message) => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log("Received message from server:", data);
      setMessageList((list) => [...list, data]);
    });
  
    return () => {
      socket.off("recieve_message");
    };
  }, [socket]);
  

  return (
    <div className="chat-window w-screen h-screen p-16 pt-24 xl:p-40 xl:pt-28 md:p-20">
      <div className="shadow-2xl">
        <div className="chat-header bg-indigo-500 text-white py-3 px-4 rounded-t-xl">
          <p className="text-lg font-bold">Chat Meet</p>
        </div>
        <div className="chat-body bg-gray-100 p-4">
          <ScrollToBottom className="message-container h-[25rem] overflow-y-auto border-2 border-indigo-500 rounded-md">
            {messageList.map((messageContent, index) => (
              <div
                key={index}
                className={`message flex p-4 ${
                  username === messageContent.author ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`message-content py-2 px-4 rounded-lg ${
                    username === messageContent.author
                      ? "bg-blue-500 text-white flex justify-end"
                      : "bg-gray-400 text-white flex justify-start"
                  }`}
                >
                  {username !== messageContent.author && (
                    <div className="profile-icon pr-2 pt-2">
                      {/* Replace this icon with the one you want for the receiver */}
                      <FaUserCircle className="w-7 h-7" />
                    </div>
                  )}
                  <div className="content">
                    <p>{messageContent.message}</p>
                    <div className="message-meta text-xs text-white flex justify-end gap-4">
                      <p>{messageContent.time}</p>
                      <p>{messageContent.author}</p>
                    </div>
                  </div>
                  {username === messageContent.author && (
                    <div className="profile-icon pl-2 pt-2">
                      {/* Use the same icon for the sender */}
                      <FaUserCircle className="w-7 h-7" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <ChatInput sendMessage={sendMessage} /> 
      </div>
    </div>
  );
}

export default Chat;