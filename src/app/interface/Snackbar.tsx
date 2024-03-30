"use client";

import React, { useEffect } from "react";
import { MdError, MdCheckCircle } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { motion } from "framer-motion";

type SnackbarProps = {
  title: "Error" | "Success" | "Warning" | "Notification" | "";
  message: string;
  open: boolean;
  onClose: () => void;
};

const Snackbar = ({ title, message, open, onClose }: SnackbarProps) => {
  const timer = 6000;
  let interval: any;

  const getBackground = () => {
    switch (title) {
      case "Error":
        return "bg-error";
      case "Success":
        return "bg-success";
      case "Warning":
        return "bg-warning";
      case "Notification":
        return "bg-main";
      default:
        return "bg-main";
    }
  };

  const getIcon = () => {
    switch (title) {
      case "Error":
        return <MdError className="mr-2 h-5 w-5" aria-hidden="true" />;
      case "Success":
        return <MdCheckCircle className="mr-2 h-5 w-5" aria-hidden="true" />;
      case "Warning":
        return <IoIosWarning className="mr-2 h-5 w-5" aria-hidden="true" />;
      case "Notification":
        return <IoIosNotifications className="mr-2 h-5 w-5" aria-hidden="true" />;
      default:
        return <IoIosNotifications className="mr-2 h-5 w-5" aria-hidden="true" />;
    }
  };

  const getBorderColor = () => {
    switch (title) {
      case "Error":
        return "border-borderError";
      case "Success":
        return "border-borderSuccess";
      case "Warning":
        return "border-borderWarning";
      case "Notification":
        return "border-borderMain";
      default:
        return "border-borderMain";
    }
  };

  useEffect(() => {
    if (open) {
      interval = setInterval(() => {
        onClose();
      }, timer);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [open]);

  return (
    <>
      {open && (
        <motion.div
          className={`${getBackground()} fixed top-snackbarTop left-2/6 2xsm:w-full 2xsm:h-28 sm:w-96 sm:max-h-32 p-4 text-light rounded-regular border-2 flex justify-between items-center ${getBorderColor()} ${
            open ? "z-50 opacity-100" : "-z-50 hidden"
          }`}
          onMouseEnter={() => {
            open = true;
            clearInterval(interval);
          }}
          onMouseLeave={() => {
            interval = setInterval(() => {
              onClose();
              clearInterval(interval);
            }, timer);
          }}
          animate={{ x: open ? [-400, 0] : -400 }}
        >
          <div className="flex flex-col justify-between items-start">
            <div className="flex items-center w-16 justify-between font-bold">
              <h1>{getIcon()}</h1>
              <h1>{title}</h1>
            </div>
            <p className="text-md">{message}</p>
          </div>
          <button className="font-bold ml-2" onClick={onClose}>
            X
          </button>
        </motion.div>
      )}
    </>
  );
};
export default Snackbar;
