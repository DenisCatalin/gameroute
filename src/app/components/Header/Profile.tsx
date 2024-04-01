"use client";

import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { MdLogout, MdEditSquare } from "react-icons/md";
import Dropdown from "@/app/interface/Dropdown/Dropdown";
import { useRouter } from "next/navigation";
import { HiDocumentAdd } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataState, setUserLoggedState, setUserPermissions } from "@/app/redux/user.slice";
import OpacityImage from "@/app/utils/OpacityImage";
import { RootState } from "@/app/redux/store";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

type Props = {
  permissions: string[] | null | undefined;
  userEmail: string | null | undefined;
  userPicture: string | null | undefined;
  userID: string | null | undefined;
  userName: string | null | undefined;
};

const Profile = ({ permissions, userEmail, userPicture, userID, userName }: Props) => {
  const [theme, setTheme] = useState<string>("System");
  const router = useRouter();

  const isAdmin = useSelector((state: RootState) => state.user.adminPermissions);
  const dispatch = useDispatch();

  const changeTheme = () => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    root.classList.remove(currentTheme);
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const signOut = () => {
    dispatch(
      setUserDataState({
        displayName: "",
        email: "",
        uid: "",
        photoURL: "",
      })
    );
    dispatch(setUserLoggedState(false));
  };

  useEffect(() => {
    if (userPicture && userEmail && userID && userName) {
      dispatch(
        setUserDataState({
          displayName: userName,
          email: userEmail,
          uid: userID,
          photoURL: userPicture,
        })
      );
      dispatch(setUserLoggedState(true));
      if (permissions) {
        dispatch(setUserPermissions(permissions));
      }
    }
  }, []);

  const Options = [
    ...(isAdmin.includes("only-upload")
      ? [
          {
            content: "Add location (GTA)",
            icon: <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
            activeIcon: <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
            onClick: () => router.push("/addlocation"),
          },
          {
            content: "Add nade (CS)",
            icon: <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
            activeIcon: <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
            onClick: () => router.push("/addNade"),
          },
          // {
          //   content: "Edit location (WIP)",
          //   icon: <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
          //   activeIcon: <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
          //   onClick: () => router.push("/editlocation"),
          // },
        ]
      : []),
    ...(isAdmin.includes("full-access")
      ? [
          {
            content: "Edit location (GTA)",
            icon: <MdEditSquare className="mr-2 h-5 w-5" aria-hidden="true" />,
            activeIcon: <MdEditSquare className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
            onClick: () => router.push("/editlocation"),
          },
        ]
      : []),
    {
      content: `Switch theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
      icon:
        theme === "dark" ? (
          <FaMoon className="mr-2 h-5 w-5" aria-hidden="true" />
        ) : (
          <FaSun className="mr-2 h-5 w-5" aria-hidden="true" />
        ),
      activeIcon:
        theme === "dark" ? (
          <FaMoon className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
        ) : (
          <FaSun className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />
        ),
      onClick: () => changeTheme(),
    },
    {
      content: (
        <LogoutLink
          onClick={signOut}
          className="font-bold w-full text-center h-5 flex items-center justify-center"
        >
          Sign out
        </LogoutLink>
      ),
      icon: <MdLogout className="mr-2 h-5 w-5" aria-hidden="true" />,
      activeIcon: <MdLogout className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
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
            <div className="w-16 h-16 rounded-full border-2 border-main relative overflow-hidden">
              {userPicture && <OpacityImage src={userPicture} fittment="cover" />}
            </div>
          </>
        }
        options={Options}
        responsive={true}
      />
    </div>
  );
};

export default Profile;
