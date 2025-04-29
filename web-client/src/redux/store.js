import { configureStore } from '@reduxjs/toolkit';

// Customer reducers
import customerReducer from './customer/customerSlice';
import cartReducer from './customer/cartSlice';

//Restaurant reducers
import restaurantReducer from './restaurant/restaurantSlice';

//Delivery reducers
import deliveryReducer from './delivery/deliverySlice';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    cart: cartReducer,

    restaurant: restaurantReducer,

    delivery: deliveryReducer
  },
});
