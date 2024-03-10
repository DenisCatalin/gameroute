import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

export type EditState = {
  documentID: string;
  documentData: DocumentData;
};

const initialState: EditState = {
  documentID: "",
  documentData: {},
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditState(state: any, action: any) {
      state.edit = {
        ...action.payload,
      };
    },
    setEditDocumentID(state: any, action: PayloadAction<string>) {
      state.documentID = action.payload;
    },
    setEditDocument(state: any, action: PayloadAction<DocumentData>) {
      state.documentData = action.payload;
    },
  },
});

export const { setEditState, setEditDocumentID, setEditDocument } = editSlice.actions;
export const editReducer = editSlice.reducer;
