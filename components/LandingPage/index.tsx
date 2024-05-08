"use client";
import Image from "next/image";
import React from "react";
import FullLogo from "../../public/Fullogo.png";
import Network from "../../public/socialnetwork.png";
import ReactTypingEffect from "react-typing-effect";

const LandingPage = () => {
  const data = [
    "👋 Hello welcome to the most amazing chat app on the Internet",
    "Connect with your friends and family bu just making an account with our cool app",
    "Securely chat with your Closed ones 👨‍👩‍👧‍👧 ",
    "Make video calls 📞  with your far-away friends with a click of a button "
  ];

  return (
    <div className="flex flex-col  h-full w-full items-center gap-4">
      <div className=" mt-16">
        <Image src={FullLogo} alt="logo" className=" w-96 h-24" />
      </div>
      <div className=" mt-24">
        <Image src={Network} alt="social-logo" className=" w-60 h-60" />
      </div>
      <div className="font-semibold text-xl mt-16">
        <ReactTypingEffect
          text={data}
          speed={50}
          eraseSpeed={50}
          typingDelay={100}
        />
      </div>
    </div>
  );
};

export default LandingPage;
