"use client";

import OpacityImage from "@/app/utils/OpacityImage";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAppCurrentGame } from "@/app/redux/app.slice";

const Logo = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setAppCurrentGame(""));
    router.push("/");
  };

  return (
    <div
      className="w-20 h-full flex items-center cursor-pointer ml-6 lg2:w-52 lg2:m-0"
      onClick={handleClick}
    >
      <div className="w-16 h-16 relative lg2:h-16 rounded-regular mr-4 overflow-hidden bg-main">
        <OpacityImage src={"/static/emblem_256.png"} fittment="contain" />
      </div>
      <div className="w-auto h-auto flex flex-col items-start justify-between">
        <p className="text-dark dark:text-light font-bold hidden lg2:block">OUR USEFUL</p>
        <p className="text-dark dark:text-light font-bold hidden lg2:block">WEB APP</p>
      </div>
    </div>
  );
};

export default Logo;
