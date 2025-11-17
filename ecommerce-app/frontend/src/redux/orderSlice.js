import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: []
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    loadOrders: (state, action) => {
      state.orders = action.payload || [];
    },
  },
});

export const { placeOrder, loadOrders } = orderSlice.actions;
export default orderSlice.reducer;