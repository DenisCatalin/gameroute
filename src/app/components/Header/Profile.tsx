"use client";

import { useEffect, useState } from "react";
import { FaSun, FaHouse } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import Dropdown from "@/app/interface/Dropdown/Dropdown";
import { useRouter } from "next/navigation";
import { HiDocumentAdd } from "react-icons/hi";
import { GiColombianStatue, GiMetalGolemHead, GiTreasureMap } from "react-icons/gi";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserAdminState, setUserDataState, setUserLoggedState } from "@/app/redux/user.slice";
import firebase from "../../lib/firebase";
import OpacityImage from "@/app/utils/OpacityImage";

const Profile = () => {
  const [theme, setTheme] = useState<string>("System");
  const router = useRouter();
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

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const userRedux = useSelector((state: any) => state.user);

  const signIn = async () => {
    if (userRedux.logged) {
      return;
    }

    const result = await signInWithPopup(auth, provider);
    const { uid, displayName, email, photoURL } = result.user;

    const firestore = firebase.firestore();
    const usersRef = firestore.collection("users");

    try {
      const userDoc = await usersRef.doc(uid).get();
      if (userDoc.exists) {
        const data = userDoc.data();
        if (data) {
          dispatch(
            setUserDataState({
              uid: data.uid,
              displayName: data.displayName,
              email: data.email,
              photoURL: data.photoURL,
            })
          );
          dispatch(setUserLoggedState(true));
          dispatch(setUserAdminState(data.admin));
        }
      } else {
        await usersRef.doc(uid).set({
          uid,
          displayName,
          email,
          photoURL,
          admin: false,
        });
      }
    } catch (error) {
      console.error(`Error saving user data:  ${error}`);
    }
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

  const Options = [
    ...(userRedux.admin
      ? [
          {
            content: "Add location",
            icon: <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
            activeIcon: <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
            onClick: () => router.push("/addlocation"),
          },
          {
            content: "Edit location",
            icon: <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
            activeIcon: <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
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
      content: "Sign out",
      onClick: () => signOut(),
      icon: <MdLogout className="mr-2 h-5 w-5" aria-hidden="true" />,
      activeIcon: <MdLogout className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
    },
  ];

  const MenuLinks = [
    {
      content: "HOME",
      icon: <FaHouse className="mr-2 h-5 w-5" aria-hidden="true" />,
      activeIcon: <FaHouse className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
      isLink: true,
      linkTo: "/",
    },
    {
      content: "SCRAP",
      icon: <GiMetalGolemHead className="mr-2 h-5 w-5" aria-hidden="true" />,
      activeIcon: <GiMetalGolemHead className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
      isLink: true,
      linkTo: "/resources/scrap",
    },
    {
      content: "STATUES",
      icon: <GiColombianStatue className="mr-2 h-5 w-5" aria-hidden="true" />,
      activeIcon: <GiColombianStatue className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
      isLink: true,
      linkTo: "/resources/statues",
    },
    {
      content: "TREASURES",
      icon: <GiTreasureMap className="mr-2 h-5 w-5" aria-hidden="true" />,
      activeIcon: <GiTreasureMap className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
      isLink: true,
      linkTo: "/resources/treasures",
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
      {userRedux.logged ? (
        <Dropdown
          mainButton={
            <>
              <div className="w-16 h-16 rounded-full border-2 border-main relative overflow-hidden">
                <OpacityImage src={userRedux.data.photoURL} fittment="cover" />
              </div>
            </>
          }
          links={MenuLinks}
          options={Options}
          responsive={true}
        />
      ) : (
        <button
          onClick={signIn}
          className="w-24 h-12 bg-offLight rounded-regular font-bold flex items-center justify-between px-2 text-dark dark:text-light transition hover:shadow-headerLightShadow dark:hover:shadow-headerDarkShadow"
        >
          <CiLogin className="w-5 h-5 text-main" />
          Sign In
        </button>
      )}
    </div>
  );
};

export default Profile;
