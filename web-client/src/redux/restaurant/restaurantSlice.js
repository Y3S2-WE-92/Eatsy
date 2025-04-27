import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginRestaurant: {},
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setLoginRestaurant: (state, action) => {
      state.loginRestaurant = action.payload;
    },

    logoutRestaurant: (state) => {
      state.loginRestaurant = null;
    },
  },
});

export const { setLoginRestaurant, logoutRestaurant } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
