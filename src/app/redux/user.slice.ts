import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserData = {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
};

type UserState = {
  data: UserData;
  admin: boolean;
  logged: boolean;
};

const initialState: UserState = {
  data: {
    displayName: "",
    email: "",
    uid: "",
    photoURL: "",
  },
  admin: false,
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

    setUserAdminState(state, action: PayloadAction<boolean>) {
      state.admin = action.payload;
    },

    setUserLoggedState(state, action: PayloadAction<boolean>) {
      state.logged = action.payload;
    },
  },
});

export const { setUserState, setUserDataState, setUserLoggedState, setUserAdminState } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
