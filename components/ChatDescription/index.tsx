import { Avatar, IconButton } from "@mui/material";
import React, { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ChatDescription = ({
  rightPanel,
  setRightPanel,
  selectedChat,
  user
}: any) => {
  const [otherUser, setOtherUser] = useState();
  const isGroupChat = selectedChat?.isGroupChat;

  useEffect(() => {
    if (selectedChat?.users?.length && user)
      setOtherUser(
        selectedChat?.users.filter((item: any) => item._id !== user._id)[0]
      );
  }, [selectedChat, user]);

  return (
    <div
      className={` shadow-md ${
        rightPanel ? "w-80" : "w-10"
      } transition-all  duration-700  box-border px-4 py-2 flex flex-col items-center `}
    >
      <IconButton
        onClick={() => {
          setRightPanel(!rightPanel);
        }}
      >
        {rightPanel ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </IconButton>
      <div
        className={`flex flex-col gap-6 text-center items-center ${
          !rightPanel ? "hidden" : ""
        }`}
      >
        {" "}
        <Avatar className="w-20 h-20" />
        <div>
          <div className="font-semibold">Name</div>
          <div className="text-sm text-gray-500">
            {isGroupChat ? selectedChat?.chatName : otherUser?.name}
          </div>
        </div>
        {!isGroupChat && (
          <div>
            <div className="font-semibold">Email</div>
            <div className="text-sm text-gray-500">{otherUser?.email}</div>
          </div>
        )}
        <div>
          <div className="font-semibold">
            {isGroupChat ? "Description" : "Status"}
          </div>
          <div className="text-sm text-gray-500">
            {otherUser?.status ?? "Hey! there I am using quickchat."}
          </div>
        </div>
        {isGroupChat && (
          <div className="w-full">
            <div className="font-semibold">
              Members ({selectedChat?.users?.length})
            </div>
            <div className="h-20 overflow-auto w-full">
              {" "}
              {selectedChat?.users?.map((grpuser: any) => (
                <div className="p-1">
                  <div className="text-sm text-gray-500">{grpuser?.name}</div>
                  <div className="text-xs text-gray-500">{grpuser?.email}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDescription;
