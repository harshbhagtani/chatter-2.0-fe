"use client";
import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { authContext } from "../AuthProvider";

export const socketContext = createContext({});

const socket = io("http://localhost:3002");

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useContext(authContext);
  useEffect(() => {
    if (isAuthenticated) socket.emit("setup", user);
    // socket.on("connected", () => {
    //   console.log("connected");
    // });
  }, [isAuthenticated]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
