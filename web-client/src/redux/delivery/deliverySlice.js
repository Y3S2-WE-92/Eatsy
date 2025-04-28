import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  loginDelivery: Cookies.get("loginDelivery") ? JSON.parse(Cookies.get("loginDelivery")) : {},
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setLoginDelivery: (state, action) => {
      state.loginDelivery = action.payload;
      Cookies.set("loginDelivery", JSON.stringify(action.payload), { expires: 1, secure: true, sameSite: 'Strict' });
    },

    logoutDelivery: (state) => {
      state.loginDelivery = {};
      Cookies.remove("loginDelivery");
    },
  },
});

export const { setLoginDelivery, logoutDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
