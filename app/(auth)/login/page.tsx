"use client";
import { useUserLogin } from "@/hooks/useAuth";
import useInput from "@/hooks/useInput";
import { setLocalstorageData } from "@/utils";
import { Button, CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Logo from "../../../public/Fullogo.png";
import Cookies from "js-cookie";

const Login = () => {
  const { value: email, handleChange: handleEmailChange } = useInput();
  const { value: password, handleChange: handlePassWordChange } = useInput();

  const route = useRouter();

  const mutation = useUserLogin((data: any) => {
    setLocalstorageData("token", data.token);
    Cookies.set("token", data.token);
    window.location.replace("/chat/home");
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const payload: { email: string; password: string } = { email, password };
    mutation.mutate(payload);
  };

  return (
    <div className="px-10">
      <div className="mt-4">
        <Image alt="logo" src={Logo} width={320} height={80} />
        <div className=" font-semibold text-2xl mt-2  ">
          👋 Hi welcome back{" "}
        </div>
      </div>

      <form className="flex flex-col gap-8 mt-10" onSubmit={onSubmit}>
        <div className="w-full">
          <label className=" inline-block mb-1  font-medium">Email</label>

          <TextField
            placeholder="john@email.com"
            variant="outlined"
            size="small"
            className="w-full "
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="w-full">
          <label className=" inline-block mb-1 font-medium">Password</label>

          <TextField
            placeholder="Your password..."
            variant="outlined"
            size="small"
            className="w-full "
            type={"password"}
            value={password}
            onChange={handlePassWordChange}
            required
          />
        </div>

        <Button variant="contained" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging inn..." : "Login"}
        </Button>
      </form>

      <div className="my-10" style={{ borderTop: "1px solid lightgray" }}></div>
      <div className=" mt-8 text-sm text-center">
        Don't have an account?
        <Link href="/signup" className="">
          Sign-up
        </Link>{" "}
      </div>
    </div>
  );
};

export default Login;
