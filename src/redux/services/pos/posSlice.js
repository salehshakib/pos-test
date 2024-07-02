import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warehouseId: null,
  cashierId: null,
  employeeId: null,
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setWarehouse: (state, action) => {
      const { warehouseId } = action.payload;
      state.warehouseId = warehouseId;
    },
    setCashier: (state, action) => {
      const { cashierId } = action.payload;
      state.cashierId = cashierId;
    },
    setEmployee: (state, action) => {
      const { employeeId } = action.payload;
      state.employeeId = employeeId;
    },
  },
});

export const { setWarehouse, setCashier, setEmployee } = posSlice.actions;

export default posSlice.reducer;

export const useCurrentWarehouse = (state) => state.pos.warehouseId;
