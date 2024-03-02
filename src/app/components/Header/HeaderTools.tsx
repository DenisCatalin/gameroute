import React from "react";
import Profile from "./Profile";

const HeaderTools = () => {
  return (
    <div className="flex justify-evenly items-center h-20 w-20 relative">
      {/* <Search /> */}
      <Profile />
    </div>
  );
};

export default HeaderTools;
