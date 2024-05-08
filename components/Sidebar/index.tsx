"use client";
import React from "react";
import {
  IoIosAddCircle,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosSearch
} from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MenuOptionType } from "@/app/constants/types";
import Link from "next/link";
import Image from "next/image";
import AppLogo from "../../public/Logo.svg";
import FullLogo from "../../public/Fullogo.png";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
  callApi,
  clearCookies,
  clearDataFromLocalStorage,
  debounce
} from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "../SearchBar";
import { FETCH_USERS } from "@/app/constants/api";
import { useCreateAccessChat } from "@/hooks/useChats";

const Sidebar = () => {
  const [collaped, setCollapsed] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<any>>([]);
  const route = useRouter();

  const logout = () => {
    clearDataFromLocalStorage();
    clearCookies();
    route.push("/login");
  };

  const mutation = useCreateAccessChat((data: any) => {
    route.push("/chat/" + data[0]?._id);
    route.refresh();
  });

  const openChat = (user: any) => {
    const data: { userId: string } = { userId: user?._id };
    mutation.mutate(data);
  };

  const MENU_OPTIONS = [
    {
      label: "Search users",
      icon: (color: string = "#000000") => (
        <IoIosSearch fontSize={24} color={color} />
      ),
      action: () => {
        setCollapsed(false);
      }
    },
    {
      label: "Notifications",
      icon: (color: string = "#000000") => (
        <IoIosNotificationsOutline fontSize={24} color={color} />
      ),
      action: () => {}
    },
    {
      label: "Profile",
      icon: (color: string = "#000000") => (
        <CiUser fontSize={24} color={color} />
      ),
      action: () => {
        route.push("/profile");
      }
    },
    {
      label: "Logout",
      icon: (color: string = "#000000") => (
        <IoIosLogOut fontSize={24} color={color} />
      ),
      action: logout
    }
  ];

  const searchUsers = debounce(async (search: string) => {
    const url = FETCH_USERS + "?search=" + search;
    const result = await callApi({ url });

    setUsers(result?.users);
  }, 500);

  const onChange = (e: any) => {
    if (e.target.value) searchUsers(e.target.value);
  };

  return (
    <div
      className={`  duration-500 transition-all flex flex-col px-4  py-2 box-border  items-center h-full shadow-xl ${
        !collaped ? "w-60" : " w-20"
      }`}
    >
      <Link href={"/"} className="mt-4">
        <Image
          src={collaped ? AppLogo : FullLogo}
          alt="logo"
          width={!collaped ? 160 : 48}
          height={48}
        />
      </Link>
      <div className="mt-10 flex flex-col w-full">
        {MENU_OPTIONS?.map((item: MenuOptionType) => {
          if (!collaped) {
            if (item.label == "Search users")
              return (
                <SearchBar
                  placeholder="Search users..."
                  onChange={onChange}
                  data={users}
                  callback={openChat}
                />
              );
            else
              return (
                <div
                  className=" rounded-lg my-4 flex items-center cursor-pointer hover:bg-primary-10 box-border p-4"
                  onClick={item.action}
                >
                  {item.icon()}
                  <span className=" ml-2">{item.label}</span>
                </div>
              );
          }
          return (
            <Tooltip title={item.label}>
              <IconButton className=" my-4" onClick={item.action}>
                {item.icon()}
              </IconButton>
            </Tooltip>
          );
        })}
      </div>
      <IconButton
        className="mt-auto"
        onClick={() => {
          setCollapsed(!collaped);
          setUsers([]);
        }}
      >
        {collaped ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </IconButton>
    </div>
  );
};

export default Sidebar;
