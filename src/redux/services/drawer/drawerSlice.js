import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateDrawerOpen: false,
  isEditDrawerOpen: false,
  isSubDrawerOpen: false,
};

const drawerSlice = createSlice({
  name: "globalDrawer",
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
    openSubDrawer: (state) => {
      state.isSubDrawerOpen = true;
    },
    closeSubDrawer: (state) => {
      state.isSubDrawerOpen = false;
    },
  },
});

export default drawerSlice.reducer;

export const {
  openCreateDrawer,
  closeCreateDrawer,
  openEditDrawer,
  closeEditDrawer,
  openSubDrawer,
  closeSubDrawer,
} = drawerSlice.actions;
