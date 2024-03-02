"use client";

import { useEffect, useState } from "react";
import { FaSun, FaHouse } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { MdDesktopWindows, MdContacts } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { AiFillProfile } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import Dropdown from "@/app/interface/Dropdown/Dropdown";
import { useRouter } from "next/navigation";
import { HiDocumentAdd } from "react-icons/hi";

const Profile = () => {
  const [theme, setTheme] = useState<string>("System");
  const router = useRouter();

  const changeTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.classList.remove(currentTheme);
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const Options = [
    {
      content: "Add location",
      icon: (
        <>
          {theme === "dark" ? (
            <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : (
            <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />
          )}
        </>
      ),
      activeIcon: (
        <>
          {theme === "dark" ? (
            <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          ) : (
            <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          )}
        </>
      ),
      onClick: () => router.push("/addlocation"),
    },
    {
      content: `Switch theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
      icon: (
        <>
          {theme === "dark" ? (
            <FaMoon className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : "light" ? (
            <FaSun className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : (
            <MdDesktopWindows className="mr-2 h-5 w-5" aria-hidden="true" />
          )}
        </>
      ),
      activeIcon: (
        <>
          {theme === "dark" ? (
            <FaMoon className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          ) : "light" ? (
            <FaSun className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          ) : (
            <MdDesktopWindows className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          )}
        </>
      ),
      onClick: () => changeTheme(),
    },
    {
      content: "Sign out",
      icon: (
        <>
          {theme === "dark" ? (
            <MdLogout className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : (
            <MdLogout className="mr-2 h-5 w-5" aria-hidden="true" />
          )}
        </>
      ),
      activeIcon: (
        <>
          {theme === "dark" ? (
            <MdLogout className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          ) : (
            <MdLogout className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          )}
        </>
      ),
    },
  ];

  const MenuLinks = [
    {
      content: "HOME",
      icon: (
        <>
          {theme === "dark" ? (
            <FaHouse className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : (
            <FaHouse className="mr-2 h-5 w-5" aria-hidden="true" />
          )}
        </>
      ),
      activeIcon: (
        <>
          {theme === "dark" ? (
            <FaHouse className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          ) : (
            <FaHouse className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          )}
        </>
      ),
      isLink: true,
      linkTo: "/",
    },
    {
      content: "SCRAP",
      icon: (
        <>
          {theme === "dark" ? (
            <BsCollectionFill className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : (
            <BsCollectionFill className="mr-2 h-5 w-5" aria-hidden="true" />
          )}
        </>
      ),
      activeIcon: (
        <>
          {theme === "dark" ? (
            <BsCollectionFill className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          ) : (
            <BsCollectionFill className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          )}
        </>
      ),
      isLink: true,
      linkTo: "/scrap",
    },
    {
      content: "STATUES",
      icon: (
        <>
          {theme === "dark" ? (
            <MdContacts className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : (
            <MdContacts className="mr-2 h-5 w-5" aria-hidden="true" />
          )}
        </>
      ),
      activeIcon: (
        <>
          {theme === "dark" ? (
            <MdContacts className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          ) : (
            <MdContacts className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
          )}
        </>
      ),
      isLink: true,
      linkTo: "/statues",
    },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      setTheme(storedTheme || "System");
    }
  }, []);

  return (
    <div className="flex items-center justify-end">
      <Dropdown
        mainButton={
          <>
            <div className="w-16 h-16 bg-dark rounded-full dark:bg-light"></div>
          </>
        }
        links={MenuLinks}
        options={Options}
        responsive={true}
      />
    </div>
  );
};

export default Profile;
