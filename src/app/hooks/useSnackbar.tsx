import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { setAppSnackbar } from "../redux/app.slice";

const useSnackbar = () => {
  const dispatch = useDispatch();

  const showSnackbar = useCallback(
    (title: "Error" | "Success" | "Warning" | "Notification" | "", message: string) => {
      hideSnackbar();
      setTimeout(() => {
        dispatch(
          setAppSnackbar({
            title,
            message,
            open: true,
          })
        );
      }, 1);
    },
    [dispatch]
  );

  const hideSnackbar = useCallback(() => {
    dispatch(
      setAppSnackbar({
        title: "",
        message: "",
        open: false,
      })
    );
  }, [dispatch]);

  return { showSnackbar, hideSnackbar };
};

export default useSnackbar;
