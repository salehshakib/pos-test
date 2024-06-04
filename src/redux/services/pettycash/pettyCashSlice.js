import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pettyCash: {},
};

const pettyCashSlice = createSlice({
  name: "pettyCash",
  initialState,
  reducers: {
    setPettyCash: (state, action) => {
      const { data } = action.payload;
      state.pettyCash = data;
    },
    clearPettyCash: (state) => {
      state.pettyCash = {};
    },
  },
});

export const { setPettyCash, clearPettyCash } = pettyCashSlice.actions;

export default pettyCashSlice.reducer;
