


import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial state: load from localStorage if exists
const initialState = { orders: JSON.parse(localStorage.getItem("orders")) || [] };

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = action.payload;
      state.orders.push(newOrder);

      // ✅ Save ONLY the orders array to localStorage
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    loadOrdersFromLocalStorage: (state) => {
      const saved = JSON.parse(localStorage.getItem("orders"));
      if (saved) {
        state.orders = saved;
      }
    },
  },
});

export const { placeOrder, loadOrdersFromLocalStorage } = orderSlice.actions;
export default orderSlice.reducer;
