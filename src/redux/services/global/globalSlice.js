import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateDrawerOpen: false,
  isEditDrawerOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openCreateDrawer: (state) => {
      state.isCreateDrawerOpen = true;
    },
    closeCreateDrawer: (state) => {
      state.isCreateDrawerOpen = false;
    },
    openEditDrawer: (state) => {
      state.isEditDrawerOpen = true;
    },
    closeEditDrawer: (state) => {
      state.isEditDrawerOpen = false;
    },
  },
});

export default globalSlice.reducer;

export const {
  openCreateDrawer,
  closeCreateDrawer,
  openEditDrawer,
  closeEditDrawer,
} = globalSlice.actions;
