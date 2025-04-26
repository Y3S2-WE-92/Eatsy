// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

// Customer reducers
import customerReducer from './customer/customerSlice';
import cartReducer from './customer/cartSlice';

//Restaurant reducers
import restaurantReducer from './restaurant/restaurantSlice';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    cart: cartReducer,

    restaurant: restaurantReducer,
  },
});
