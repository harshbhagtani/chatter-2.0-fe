import { authContext } from "@/Providers/AuthProvider";
import { downloadFile, formatDateTime } from "@/utils";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FaDownload, FaFileInvoice } from "react-icons/fa6";
import { GoFileDirectory } from "react-icons/go";

const MessageTile = ({ data, sender }: any) => {
  const renderMessage = () => {
    if (data.isAttachMent == "text") return data.content;
    else {
      const arr = data.content.split("/");
      const fileName = arr[arr.length - 1];
      return (
        <div className="flex items-center gap-2">
          <FaFileInvoice fontSize={20} />
          <div className=" text-ellipsis whitespace-nowrap overflow-hidden ">
            {fileName}
          </div>

          <IconButton
            size="small"
            onClick={() => downloadFile(data.content, fileName)}
          >
            <FaDownload color="white" />
          </IconButton>
        </div>
      );
    }
  };

  return (
    <div className={`flex gap-2 ${!sender ? " flex-row-reverse" : ""}`}>
      <Avatar sizes="small" />
      <div
        className={` relative max-w-60 min-w-[100px] px-4 py-2 pb-6 text-sm  break-words rounded-md ${
          sender ? "bg-gray-100" : "bg-primary text-white"
        }`}
      >
        {renderMessage()}
        <div className=" text-ellipsis whitespace-nowrap overflow-hidden  text-[10px] absolute bottom-0 right-1">
          {formatDateTime(data.updatedAt)}
        </div>
      </div>
    </div>
  );
};

export default MessageTile;
