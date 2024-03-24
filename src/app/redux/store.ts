import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app.slice";
import { userReducer } from "./user.slice";
import { editReducer } from "./edit.slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    edit: editReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
