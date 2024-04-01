import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserData = {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
};

type UserState = {
  data: UserData;
  adminPermissions: string[];
  logged: boolean;
};

const initialState: UserState = {
  data: {
    displayName: "",
    email: "",
    uid: "",
    photoURL: "",
  },
  adminPermissions: [],
  logged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      state = {
        ...action.payload,
      };
    },

    setUserDataState(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
    },

    setUserPermissions(state, action: PayloadAction<string[]>) {
      state.adminPermissions = action.payload;
    },

    setUserLoggedState(state, action: PayloadAction<boolean>) {
      state.logged = action.payload;
    },
  },
});

export const { setUserState, setUserDataState, setUserLoggedState, setUserPermissions } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
