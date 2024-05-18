import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateDrawerOpen: false,
  isEditDrawerOpen: false,
  isBrandDrawerOpen: false,
  isCategoryDrawerOpen: false,
  isTaxDrawerOpen: false,
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
      state.isBrandDrawerOpen = true;
    },
    closeBrandDrawer: (state) => {
      state.isBrandDrawerOpen = false;
    },
    openCategoryDrawer: (state) => {
      state.isCategoryDrawerOpen = true;
    },
    closeCategoryDrawer: (state) => {
      state.isCategoryDrawerOpen = false;
    },
    openTaxDrawer: (state) => {
      state.isTaxDrawerOpen = true;
    },
    closeTaxDrawer: (state) => {
      state.isTaxDrawerOpen = false;
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
  openTaxDrawer,
  closeTaxDrawer,
} = drawerSlice.actions;
