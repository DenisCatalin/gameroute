import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarState } from "../interface/Snackbar";

export type AppState = {
  theme: string;
  navigation: boolean;
  currentPage: string;
  snackbar: SnackbarState;
  locationToBeAdded: boolean;
};

const initialState: AppState = {
  theme: "light",
  navigation: false,
  currentPage: "/",
  locationToBeAdded: false,
  snackbar: {
    title: "",
    message: "",
    open: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppState(state: any, action: any) {
      state.app = {
        ...action.payload,
      };
    },
    setAppTheme(state: any, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
    setAppNavigation(state: any, action: PayloadAction<boolean>) {
      state.navigation = action.payload;
    },
    setAppCurrentPage(state: any, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    setAppSnackbar(state: any, action: PayloadAction<SnackbarState>) {
      state.snackbar = action.payload;
    },
    setLocationToBeAdded(state: any, action: PayloadAction<boolean>) {
      state.locationToBeAdded = action.payload;
    },
  },
});

export const {
  setAppState,
  setAppTheme,
  setAppNavigation,
  setAppCurrentPage,
  setAppSnackbar,
  setLocationToBeAdded,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
