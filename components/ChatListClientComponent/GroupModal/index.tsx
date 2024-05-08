import { FETCH_USERS } from "@/app/constants/api";
import SearchBar from "@/components/SearchBar";
import { useCreateGroupChat } from "@/hooks/useChats";
import { callApi, debounce } from "@/utils";
import { Box, Button, Chip, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

const GroupModal = ({ setGroupModal }) => {
  const [added, setAdded] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const [name, setName] = useState<string>("");

  const router = useRouter();

  const { mutate } = useCreateGroupChat((data: any) => {
    router.push("/chat/" + data._id);
    router.refresh();
    setGroupModal(false);
  });

  const searchUsers = debounce(async (search: string) => {
    const url = FETCH_USERS + "?search=" + search;
    const result = await callApi({ url });

    setUsers(
      result?.users?.filter((user: any) => {
        return !added.find((addeduser: any) => addeduser._id === user._id);
      })
    );
  }, 500);

  const onChange = (e: any) => {
    if (e.target.value) searchUsers(e.target.value);
  };

  const addMember = (user: any) => {
    setAdded([...added, user]);
    setUsers(users.filter((item: any) => item._id !== user._id));
  };
  const removeMember = (user: any) => {
    console.log(user, "hhh");
    setAdded(added.filter((item: any) => item._id !== user._id));
    setUsers([...users, user]);
  };

  const createGroupChat = (e: any) => {
    e.preventDefault();

    if (added.length < 1) return toast("No members added");

    const payload: { name: string; userIds: string[] } = {
      name,
      userIds: added?.map((user: any) => user._id)
    };
    mutate(payload);
  };

  return (
    <Box sx={{ ...style, width: 400 }} className=" rounded-lg">
      <p className="text-3xl  m-0  font-semibold">Create a group chat</p>
      <form className="flex flex-col gap-2 mt-3" onSubmit={createGroupChat}>
        <div>
          <label className=" block text-sm  mb-1 font-semibold">
            Group name
          </label>
          <TextField
            required
            size="small"
            className=" w-full"
            placeholder="Group123"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>
        <div>
          <label className=" block text-sm mb-1 font-semibold">
            Add members
          </label>
          <SearchBar
            placeholder="Search users..."
            onChange={onChange}
            data={users}
            callback={addMember}
          />
        </div>

        <div className=" text-xs text-gray-400">
          {!added.length ? (
            "No members added"
          ) : (
            <>{added.length} Members added</>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {added?.map((user: any) => (
            <Chip label={user?.name} onDelete={() => removeMember(user)} />
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button
            color={"error"}
            variant={"outlined"}
            onClick={() => setGroupModal(false)}
          >
            Cancel
          </Button>
          <Button
            startIcon={<GoPlusCircle />}
            type="submit"
            variant={"contained"}
          >
            Create group
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default GroupModal;
