"use client";

import OpacityImage from "@/app/utils/OpacityImage";
import React from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div
      className="w-52 h-full flex items-center justify-between cursor-pointer ml-6 lg2:w-60 lg2:m-0"
      onClick={handleClick}
    >
      <div className="w-20 h-20 relative lg2:w-32 lg2:h-20 rounded-regular mr-4 overflow-hidden">
        <OpacityImage src={"/static/logo.png"} fittment="contain" />
      </div>
      <div className="w-auto h-auto flex flex-col items-start">
        <p className="text-dark dark:text-light text-xl font-bold hidden lg:block">
          Game<span className="text-main font-bold">Route</span>
        </p>
      </div>
    </div>
  );
};

export default Logo;
