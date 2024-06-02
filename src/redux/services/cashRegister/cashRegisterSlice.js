import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cash: false,
};

const cashRegisterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCashRegister: (state) => {
      state.cash = true;
    },
    clearCashRegister: (state) => {
      state.cash = false;
    },
  },
});

export const { setCashRegister, clearCashRegister } = cashRegisterSlice.actions;

export default cashRegisterSlice.reducer;
