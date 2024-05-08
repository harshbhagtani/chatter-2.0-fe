"use client";

import { Drawer, IconButton, Modal } from "@mui/material";
import React from "react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import ChatTile from "../ChatTile";
import SearchBar from "../SearchBar";
import GroupModal from "./GroupModal";

const ChatList = ({ chatList }: { chatList: Array<any> }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [groupModal, setGroupModal] = useState<boolean>(false);

  const onChange = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Modal open={groupModal} onClose={() => setGroupModal(false)}>
        <GroupModal setGroupModal={setGroupModal} />
      </Modal>

      <div
        className="p-6 flex justify-between items-center "
        style={{ borderBottom: "1px solid #EDF2F7" }}
      >
        <div>
          Messages <span>{chatList?.length}</span>
        </div>
        <div>
          <IconButton>
            <GoPlus fontSize={24} onClick={() => setGroupModal(true)} />
          </IconButton>
        </div>
      </div>
      <div className="px-6 py-3 flex justify-between items-center">
        <SearchBar onChange={onChange} placeholder="Search chats..." />
      </div>
      <div className="p-3 flex  grow flex-col overflow-y-auto">
        {chatList
          ?.filter((chat: any) =>
            chat.chatName.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((chat: any) => (
            <ChatTile data={chat} />
          ))}
      </div>
    </>
  );
};

export default ChatList;
