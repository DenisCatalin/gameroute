import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarState } from "../interface/Snackbar";

export type NadesProp = {
  type: string;
  description: string;
  video: string;
  gallery: string;
  createdAt: string;
};

export type AppState = {
  theme: string;
  navigation: boolean;
  currentPage: string;
  snackbar: SnackbarState;
  locationToBeAdded: boolean;
  showGallery: boolean;
  nades: NadesProp[];
  showNadeWrapper: boolean;
  currentGame: string;
  currentGameItem: string;
  gallery: string[];
  watchingDocID: string;
};

const initialState: AppState = {
  theme: "light",
  navigation: false,
  currentPage: "/",
  locationToBeAdded: false,
  gallery: [],
  nades: [],
  showGallery: false,
  showNadeWrapper: false,
  currentGame: "",
  currentGameItem: "",
  watchingDocID: "",
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
    setAppGallery(state: any, action: PayloadAction<string[]>) {
      state.gallery = action.payload;
    },
    setShowGallery(state: any, action: PayloadAction<boolean>) {
      state.showGallery = action.payload;
    },
    setWatchingDocID(state: any, action: PayloadAction<string>) {
      state.watchingDocID = action.payload;
    },
    setAppCurrentGame(state: any, action: PayloadAction<string>) {
      state.currentGame = action.payload;
    },
    setAppCurrentGameItem(state: any, action: PayloadAction<string>) {
      state.currentGameItem = action.payload;
    },
    setAppNades(state: any, action: PayloadAction<NadesProp[]>) {
      state.nades = action.payload;
    },
    setAppShowNadeWrapper(state: any, action: PayloadAction<boolean>) {
      state.showNadeWrapper = action.payload;
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
  setAppGallery,
  setShowGallery,
  setWatchingDocID,
  setAppCurrentGame,
  setAppCurrentGameItem,
  setAppShowNadeWrapper,
  setAppNades,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
