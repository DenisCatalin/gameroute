"use client";

import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { MdLogout, MdEditSquare } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import Dropdown from "@/app/interface/Dropdown/Dropdown";
import { useRouter } from "next/navigation";
import { HiDocumentAdd } from "react-icons/hi";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserAdminState, setUserDataState, setUserLoggedState } from "@/app/redux/user.slice";
import firebase from "../../lib/firebase";
import OpacityImage from "@/app/utils/OpacityImage";
import axios from "axios";
import { RootState } from "@/app/redux/store";

const Profile = () => {
  const [theme, setTheme] = useState<string>("System");
  const [checkingAuth, setCheckingAuth] = useState<boolean>(false);
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
  const userRedux = useSelector((state: RootState) => state.user);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/checkToken");
      if (res.data.message === "No token") {
        setCheckingAuth(false);
        return;
      }
      if (res.data.message === "Token expired") {
        dispatch(
          setUserDataState({
            uid: "",
            displayName: "",
            email: "",
            photoURL: "photoURL",
          })
        );
        dispatch(setUserLoggedState(false));
        dispatch(setUserAdminState(false));
        setCheckingAuth(false);
        return;
      }
      const { uid, admin, photoURL, email, displayName } = res.data.token.data;
      dispatch(
        setUserDataState({
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        })
      );
      dispatch(setUserLoggedState(true));
      dispatch(setUserAdminState(admin));
      setCheckingAuth(false);
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  const setToken = async (data: any) => {
    try {
      await axios.post("/api/setToken", {
        data,
      });
    } catch (error) {
      console.error("Error setting token:", error);
    }
  };

  useEffect(() => {
    checkAuth();
    setCheckingAuth(true);
  }, []);

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
          setToken({
            uid: data.uid,
            displayName: data.displayName,
            email: data.email,
            photoURL: data.photoURL,
            admin: data.admin,
          });
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
            content: "Add location (GTA)",
            icon: <HiDocumentAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
            activeIcon: <HiDocumentAdd className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
            onClick: () => router.push("/addlocation"),
          },
          {
            content: "Edit location (GTA)",
            icon: <MdEditSquare className="mr-2 h-5 w-5" aria-hidden="true" />,
            activeIcon: <MdEditSquare className="mr-2 h-5 w-5 text-darkMain" aria-hidden="true" />,
            onClick: () => router.push("/editlocation"),
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
          options={Options}
          responsive={true}
        />
      ) : (
        <button
          onClick={signIn}
          disabled={checkingAuth}
          className={`w-24 h-12 bg-offLight rounded-regular font-bold flex items-center justify-between px-2 text-dark dark:text-light transition ${
            checkingAuth
              ? ""
              : "hover:shadow-headerLightShadow dark:hover:shadow-headerDarkShadow opacity-100"
          }`}
        >
          <CiLogin className="w-5 h-5 text-main" />
          Sign In
        </button>
      )}
    </div>
  );
};

export default Profile;
