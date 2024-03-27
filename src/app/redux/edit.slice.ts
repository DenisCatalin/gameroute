import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EditState = {
  rowID: number;
};

const initialState: EditState = {
  rowID: 0,
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditRowID(state: any, action: PayloadAction<number>) {
      state.rowID = action.payload;
    },
  },
});

export const { setEditRowID } = editSlice.actions;
export const editReducer = editSlice.reducer;
