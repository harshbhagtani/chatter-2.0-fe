import { useAppStore } from "@/app/store/useAppStore";
import { useDeletechat } from "@/hooks/useChats";
import { calculateTimeDifference } from "@/utils";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { toast } from "react-toastify";

const ChatTile = ({ data }: any) => {
  const router = useRouter();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: mutateDelete } = useDeletechat(() => {
    toast("Chat successfully deleted", { type: "success" });
    router.push("/chat/home");
    router.refresh();
    handleClose();
  });

  const onClick = () => {
    router.push("/chat/" + data?._id);
  };

  const setSelectedChat = useAppStore((state: any) => state.setSelectedChat);

  useEffect(() => {
    if (id === data?._id) {
      setSelectedChat({ ...data });
    }
  }, [id]);

  const deleteChat = () => {
    const payload: { chatId: string } = { chatId: data._id };
    mutateDelete(payload);
  };

  return (
    <div
      className={`p-3 flex gap-4 w-full hover:bg-primary-10 rounded-lg hover:cursor-pointer box-border ${
        id === data?._id ? "bg-primary-10" : ""
      }`}
      onClick={onClick}
    >
      <Avatar></Avatar>
      <div className=" relative grow  ">
        <div className="text-sm">{data?.chatName ?? "User"}</div>
        <div className="text-xs  text-gray-400  text-ellipsis whitespace-nowrap overflow-hidden w-24">
          {data?.latestMessage?.content ?? "Message"}
        </div>
        <div className="text-xs  text-gray-400 absolute right-1 top-1 ">
          {data?.latestMessage ? (
            calculateTimeDifference(
              new Date(),
              new Date(data?.latestMessage?.updatedAt)
            )
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="w-6">
        <IconButton onClick={handleClick}>
          <FaEllipsisVertical fontSize={14} />
        </IconButton>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={deleteChat}>Delete chat</MenuItem>
      </Menu>
    </div>
  );
};

export default ChatTile;
