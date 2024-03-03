import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app.slice";
import { userReducer } from "./user.slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export default store;
