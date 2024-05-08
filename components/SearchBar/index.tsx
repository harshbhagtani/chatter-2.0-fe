import { useCreateAccessChat } from "@/hooks/useChats";
import useOutSideClick from "@/hooks/useOutSideClick";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

const SearchBar = ({
  placeholder = "Search",
  data,
  onChange,
  callback
}: {
  placeholder: string;
  data?: Array<any>;
  onChange: (e: any) => void;
  callback: (user: any) => void;
}) => {
  const [hide, setHide] = useState(false);
  const searchRef = useRef();
  const divRef = useRef();
  const router = useRouter();

  const closeSerachMenu = () => {
    setHide(true);
  };

  useOutSideClick([searchRef, divRef], closeSerachMenu);

  return (
    <div className="relative w-full">
      <input
        ref={searchRef}
        onFocus={() => setHide(false)}
        className="border-0 outline-0 bg-gray-100 rounded-lg h-12 w-full px-4 box-border"
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      {data?.length && !hide ? (
        <div
          ref={divRef}
          className=" absolute top-12 max-h-32 w-full  bg-white  shadow box-border  overflow-y-scroll z-50"
        >
          {data?.map((user: any) => (
            <div className=" flex justify-between p-3 w-full box-border hover:bg-primary-10 rounded-md cursor-pointer ">
              <div className="w-4/6">
                <div className=" text-ellipsis  overflow-hidden whitespace-nowrap">
                  {user.name}
                </div>
                <div className="text-xs font-light text-ellipsis  overflow-hidden whitespace-nowrap">
                  {user.email}
                </div>
              </div>
              <Tooltip title="Add user">
                <IconButton className="" onClick={() => callback(user)}>
                  <IoIosAddCircle />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
