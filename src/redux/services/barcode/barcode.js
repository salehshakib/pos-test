import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barcode: null,
};

const barcodeSlice = createSlice({
  name: "barcode",
  initialState,
  reducers: {
    setBarcode: (state, action) => {
      state.barcode = action.payload;
    },
  },
});

export default barcodeSlice.reducer;

export const { setBarcode } = barcodeSlice.actions;

export const getBarcode = (state) => state.barcode;
