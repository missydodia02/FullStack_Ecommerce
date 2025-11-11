import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

// ✅ Preload cart and orders from localStorage
const preloadedCart = JSON.parse(localStorage.getItem("cart")) || undefined;
const preloadedOrders = JSON.parse(localStorage.getItem("orders")) || { orders: [] };

const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
  },
  preloadedState: {
    cart: preloadedCart,
    orders: preloadedOrders
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  localStorage.setItem("orders", JSON.stringify(store.getState().orders));
});

export default store;
