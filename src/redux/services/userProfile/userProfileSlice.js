import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "User",
  email: null,
  role: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { name, email, role } = action.payload;

      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.role = role ? role : state.role;
    },
  },
});

export const { setDeveloper } = userProfileSlice.actions;

export default userProfileSlice.reducer;
