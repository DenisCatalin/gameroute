import OpacityImage from "@/app/utils/OpacityImage";
import React from "react";

const Logo = () => {
  return (
    <div className="w-20 h-full flex items-center lg2:w-96">
      <div className="w-16 h-16 relative lg2:h-16 rounded-regular mr-4 overflow-hidden bg-main">
        <OpacityImage src={"/static/emblem_256.png"} fittment="contain" />
      </div>
      <div className="w-auto h-auto flex flex-col items-start justify-between">
        <p className="text-dark dark:text-light font-bold hidden text-main lg2:block">LOGO</p>
        <p className="text-dark dark:text-light font-bold hidden lg2:block">SLOGAN</p>
      </div>
    </div>
  );
};

export default Logo;
