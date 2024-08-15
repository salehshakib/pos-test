import { createSlice } from "@reduxjs/toolkit";
import logo from "../../../assets/data/defaultLogo";

const initialState = {
  developedBy: null,
  hyperLink: null,
  logo: logo,
};

const developerSlice = createSlice({
  name: "developer",
  initialState,
  reducers: {
    setDeveloper: (state, action) => {
      const { developedBy, hyperLink } = action.payload;

      state.developedBy = developedBy;
      state.hyperLink = hyperLink;
    },

    setLogo: (state, action) => {
      state.logo = action.payload;
    },
  },
});

export const { setDeveloper, setLogo } = developerSlice.actions;

export const getLogo = (state) => state.developer.logo;

export default developerSlice.reducer;
