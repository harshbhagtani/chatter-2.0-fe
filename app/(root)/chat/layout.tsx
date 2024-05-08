import { ACCESS_CHAT } from "@/app/constants/api";
import { BASE_SERVER } from "@/app/constants/config";
import ChatList from "@/components/ChatListClientComponent";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

async function getData() {
  const url = BASE_SERVER + ACCESS_CHAT;

  try {
    const token = cookies()?.get("token")?.value;

    const decoded = jwtDecode(token);

    const res = await fetch(url, {
      method: "GET",
      //   next: { revalidate: 0 },
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    });
    const chatList = await res.json();
    return { chatList, userId: decoded };
  } catch (e) {
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    redirect("/login");
  }
}

const Layout = async ({ children }: any) => {
  const { chatList, userId } = await getData();

  const chatArr = chatList?.map((chat: any) => {
    const returnchatdata = { ...chat };
    if (!chat?.isGroupChat) {
      const [otherUser] = chat?.users.filter(
        ({ _id }: any) => _id != userId._id
      );

      returnchatdata.chatName = otherUser?.name;
    }

    return { ...returnchatdata };
  });

  return (
    <div className="flex items-center  h-screen">
      <Sidebar />
      <div className="h-full   min-w-96  shadow flex flex-col">
        <ChatList chatList={chatArr} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
