"use client";
import { FETCH_MY_PROFILE } from "@/app/constants/api";
import { callApi, getDataFromLocalStorage } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const authContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const path = usePathname();
  const route = useRouter();

  useEffect(() => {
    if (path.startsWith("/chat")) {
      callApi({ url: FETCH_MY_PROFILE }).then((res) => {
        setUser({ ...res });
        setAuthenticated(true);
      });
    }
    if ((path === "/login" || path === "/signup") && Cookies.get("token")) {
      route.push("/chat/home");
    }
    if (path === "/") {
      route.push("/login");
    }
  }, [path]);

  return (
    <authContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
