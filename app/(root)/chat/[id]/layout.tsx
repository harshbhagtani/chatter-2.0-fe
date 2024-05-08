import Sidebar from "@/components/Sidebar";
import React from "react";

const Layout = ({
  children,
  chatmessages
}: {
  children: React.ReactNode;
  chatlist: React.ReactNode;
  chatmessages: React.ReactNode;
}) => {
  return (
    <div className="flex items-center  h-screen w-full">
      {/* <div className="h-full">{children}</div> */}
      <div className="h-full grow">{chatmessages}</div>
    </div>
  );
};

export default Layout;
