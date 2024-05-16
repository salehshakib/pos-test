import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateDrawerOpen: false,
  isEditDrawerOpen: false,
  isBrandDrawerOpen: false,
  isCategoryDrawerOpen: false,
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
    openBrandDrawer: (state) => {
      state.isBrandDrawerOpen = false;
    },
    closeBrandDrawer: (state) => {
      state.isBrandDrawerOpen = false;
    },
    openCategoryDrawer: (state) => {
      state.isCategoryDrawerOpen = false;
    },
    closeCategoryDrawer: (state) => {
      state.isCategoryDrawerOpen = false;
    },
  },
});

export default drawerSlice.reducer;

export const {
  openCreateDrawer,
  closeCreateDrawer,
  openEditDrawer,
  closeEditDrawer,
  openBrandDrawer,
  closeBrandDrawer,
  openCategoryDrawer,
  closeCategoryDrawer,
} = drawerSlice.actions;
