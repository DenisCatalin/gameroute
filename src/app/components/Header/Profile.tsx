"use client";

import { useEffect, useState } from "react";
import { FaSun, FaHouse } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { MdDesktopWindows, MdContacts } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import Dropdown from "@/app/interface/Dropdown/Dropdown";
import { useRouter } from "next/navigation";
import { HiDocumentAdd } from "react-icons/hi";
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
        ]
      : []),
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
      onClick: () => signOut(),
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
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
};

export default Profile;
