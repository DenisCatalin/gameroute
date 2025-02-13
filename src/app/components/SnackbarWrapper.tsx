"use client";

import React from "react";
import Snackbar from "../interface/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { setAppSnackbar } from "../redux/app.slice";
import { RootState } from "../redux/store";

const SnackbarWrapper = () => {
  const snackbar = useSelector((state: RootState) => state.app.snackbar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      setAppSnackbar({
        title: "",
        message: "",
        open: false,
      })
    );
  };
  return (
    <Snackbar
      title={snackbar.title}
      message={snackbar.message}
      open={snackbar.open}
      onClose={handleClose}
    />
  );
};

export default SnackbarWrapper;
