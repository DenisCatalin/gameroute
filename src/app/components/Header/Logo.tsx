import OpacityImage from "@/app/utils/OpacityImage";
import React from "react";

const Logo = () => {
  return (
    <div className="w-20 h-full flex items-center lg2:w-96">
      <div className="w-20 h-12 relative lg2:h-16">
        <OpacityImage src={"/static/logo.png"} fittment="contain" />
      </div>
      <div className="w-auto h-auto flex flex-col items-start justify-between">
        <p className="text-dark dark:text-light font-bold hidden lg2:block">BLACKWATER INC.</p>
        <p className="text-dark dark:text-light font-bold hidden lg2:block">
          You take our bread, you’re dead
        </p>
      </div>
    </div>
  );
};

export default Logo;
