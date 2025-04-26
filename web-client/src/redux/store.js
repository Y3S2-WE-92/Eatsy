// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

// Customer reducers
import customerReducer from './customer/customerSlice';
import cartReducer from './customer/cartSlice';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    cart: cartReducer,
  },
});
