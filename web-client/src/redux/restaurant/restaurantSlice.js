import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  loginRestaurant: Cookies.get("loginRestaurant") ? JSON.parse(Cookies.get("loginRestaurant")) : {},
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setLoginRestaurant: (state, action) => {
      state.loginRestaurant = action.payload;
      Cookies.set("loginRestaurant", JSON.stringify(action.payload), { expires: 1, secure: true, sameSite: 'Strict' });
    },

    logoutRestaurant: (state) => {
      state.loginRestaurant = {};
      Cookies.remove("loginRestaurant");
    },
  },
});

export const { setLoginRestaurant, logoutRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
