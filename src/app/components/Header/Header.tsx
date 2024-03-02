import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import HeaderTools from "./HeaderTools";

const Header = () => {
  return (
    <nav className="z-50 sticky top-0 w-full h-6rem bg-light rounded-regular px-0 flex justify-between items-center 2xsm:rounded-b-regular 2xsm:rounded-l-regular 2xsm:shadow-none 2xsm:bg-coverLight lg2:shadow-headerLightShadow lg2:p-4 transition-all dark:bg-coverDark dark:lg2:shadow-headerDarkShadow">
      <Logo />
      <div className="w-24 h-auto flex items-center justify-between lg:w-110">
        <Navigation />
        <HeaderTools />
      </div>
    </nav>
  );
};

export default Header;
