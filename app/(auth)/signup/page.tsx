"use client";
import { useUserSignUp } from "@/hooks/useAuth";
import useInput from "@/hooks/useInput";
import { setLocalstorageData } from "@/utils";
import { Button, Link, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Logo from "../../../public/Fullogo.png";
import Cookies from "js-cookie";

const Signup = () => {
  const { value: name, handleChange: handleNameChange } = useInput();
  const { value: email, handleChange: handleEmailChange } = useInput();
  const { value: password, handleChange: handlePassWordChange } = useInput();
  const { value: confirmpassword, handleChange: handleConfirmPasswordChange } =
    useInput();

  const route = useRouter();

  const mutation = useUserSignUp((data: any) => {
    setLocalstorageData("token", data.token);
    Cookies.set("token", data.token);
    window.location.replace("/chat/home");
    // route.push("/chat/home");
  });

  const onSubmit = (e: any) => {
    if (password !== confirmpassword) return;
    e.preventDefault();
    const payload: { email: string; password: string; name: string } = {
      email,
      password,
      name
    };
    mutation.mutate(payload);
  };

  return (
    <div className="px-10">
      <div className="mt-4">
        <Image alt="logo" src={Logo} width={320} height={80} />
        <div className=" font-semibold text-xl mt-2  ">
          Signup fast 😎 and connect with your friends
        </div>
      </div>

      <form className="flex flex-col gap-8 mt-10" onSubmit={onSubmit}>
        <div className="w-full">
          <label className=" inline-block mb-1  font-medium">Name</label>

          <TextField
            placeholder="john"
            variant="outlined"
            size="small"
            className="w-full "
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="w-full">
          <label className=" inline-block mb-1  font-medium">Email</label>

          <TextField
            placeholder="john@email.com"
            variant="outlined"
            size="small"
            className="w-full"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="w-full">
          <label className=" inline-block mb-1 font-medium">Password</label>

          <TextField
            placeholder="Create a strong password..."
            variant="outlined"
            size="small"
            className="w-full "
            type={"password"}
            value={password}
            onChange={handlePassWordChange}
            required
          />
        </div>
        <div className="w-full">
          <label className=" inline-block mb-1 font-medium">
            Confirm Password
          </label>

          <TextField
            placeholder="Confirm password entered..."
            variant="outlined"
            size="small"
            className="w-full"
            type={"password"}
            value={confirmpassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <Button variant="contained" type="submit">
          Signup
        </Button>
      </form>

      <div className="my-10" style={{ borderTop: "1px solid lightgray" }}></div>
      <div className=" mt-8 text-sm text-center">
        Already have an account?
        <Link href="/login">Sign-in</Link>
      </div>
    </div>
  );
};

export default Signup;
