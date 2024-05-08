"use client";
import { useAppStore } from "@/app/store/useAppStore";
import ChatDescription from "@/components/ChatDescription";
import HomePage from "@/components/HomePage";
import Attachment from "@/components/Icons/Attachment";
import Call from "@/components/Icons/Call";
import Send from "@/components/Icons/Send";
import MessageTile from "@/components/MessageTile";
import TypingSkeleton from "@/components/TypingSkeleton";
import {
  useFetchMessages,
  useSendMessage,
  useUploadFile
} from "@/hooks/useMessages";
import { authContext } from "@/Providers/AuthProvider";
import { socketContext } from "@/Providers/SocketProvider";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import { useParams } from "next/navigation";

import React, { useRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ChatMessages = () => {
  const { user } = useContext(authContext) as any;
  const [rightPanel, setRightPanel] = useState<boolean>(true);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [text, setText] = useState("");
  const selectedChat = useAppStore((state: any) => state.selectedChat);
  const { socket } = useContext(socketContext);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const ref = useRef<HTMLDivElement | null>();
  let tid = useRef();

  const { id } = useParams();

  const { mutate: mutateSendMessage, isPending: sendingMessage } =
    useSendMessage((data: any) => {
      socket.emit("sendMessage", data);
      refetch();
    });

  const { mutate: mutateSendFile, isPending: sendingFile } = useUploadFile(
    (data: any) => {
      socket.emit("sendMessage", data);
      refetch();
    }
  );
  const { data, refetch, isLoading } = useFetchMessages(
    id,
    !!id && id !== "home"
  );

  useEffect(() => {
    if (data?.length) {
      setMessages([...data]);
    }
  }, [data]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  useEffect(() => {
    if (id) {
      if (id !== "home") refetch();
      socket.emit("join room", selectedChat);
    }

    socket.on("newMessage", (data: any) => {
      console.log(data, "hii-new");
      if (data.chat._id === id) setMessages([...messages, data]);
    });

    function listener({ _id }: any) {
      if (id === _id) {
        setIsTyping(true);
      }
    }

    function listenoff() {
      setIsTyping(false);
    }

    socket.on("typing", (data: any) => {
      if (data._id === id) {
        setIsTyping(true);
      }
    });

    socket.on("stop typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("typing", listener);
      socket.off("stop typing", listenoff);
    };
  }, [id, selectedChat]);

  const sendText = (e: any) => {
    e.preventDefault();

    const payload: {
      message: string;
      chatId: any;
    } = {
      message: text,
      chatId: id
    };

    mutateSendMessage(payload);

    setText("");
  };

  const messageTyping = (e: any) => {
    setText(e.target.value);

    socket.emit("typing", selectedChat);
    if (tid.current) clearTimeout(tid.current);
    tid.current = setTimeout(
      () => socket.emit("not typing", selectedChat),
      3000
    );
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: any) => {
    // Handle the file change event here
    const maxSize = 4 * 1024 * 1024;
    const file = event.target.files[0];

    if (file.size > maxSize)
      return toast("File size can't be more than 4MB", "error");
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("chatId", id);
    mutateSendFile(formdata);
  };

  if (id === "home") return <HomePage />;

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col relative">
        <div
          className="flex p-6 justify-between h-20 box-border items-center gap-4 "
          style={{ borderBottom: "1px solid #EDF2F7" }}
          onClick={() => setRightPanel(!rightPanel)}
        >
          <Avatar />
          <div className="grow">
            <div className="text-xl font-semibold">
              {selectedChat?.chatName}
            </div>
            <div className=" text-xs ">
              {isTyping ? "typing..." : "Online"}{" "}
            </div>
          </div>

          <Button
            variant="text"
            style={{
              background: "#615EF01A",
              color: "#615EF0",
              width: "100px",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            <Call />
            Call
          </Button>
        </div>
        <div
          ref={ref}
          className="grow p-6 box-border flex flex-col gap-2  bg-cover overflow-y-auto "
        >
          {messages?.map((data) => {
            const sender = data?.sender?._id !== user?._id;
            return (
              <div
                className={`flex w-full ${
                  sender ? "justify-start" : "justify-end "
                }`}
              >
                <MessageTile data={data} sender={sender} />
              </div>
            );
          })}
          <div className={`flex w-full justify-start`}>
            {isTyping && <TypingSkeleton />}
          </div>
        </div>
        <div className="w-full flex gap-4  box-border left-0 px-4 ">
          <input
            type="file"
            id="custom-file-input"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <IconButton onClick={handleButtonClick}>
            <Attachment />
          </IconButton>

          <form onSubmit={sendText} className="grow">
            <TextField
              variant="outlined"
              size="small"
              className="w-full"
              value={text}
              onChange={messageTyping}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    className="hover:cursor-pointer"
                  >
                    <IconButton
                      disabled={!text || sendingMessage}
                      type="submit"
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </div>
      </div>
      <ChatDescription
        rightPanel={rightPanel}
        setRightPanel={setRightPanel}
        selectedChat={selectedChat}
        user={user}
      />
    </div>
  );
};

export default ChatMessages;
