import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primaryColor: "#51258F",
  secondaryColor: "#F2E8FF",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { setPrimaryColor, setSecondaryColor } = themeSlice.actions;
