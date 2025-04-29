import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"; 

const initialState = {
  loginCustomer: Cookies.get("loginCustomer") ? JSON.parse(Cookies.get("loginCustomer")) : {},
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLoginCustomer: (state, action) => {
      state.loginCustomer = action.payload;
      Cookies.set("loginCustomer", JSON.stringify(action.payload), { expires: 1, secure: true, sameSite: 'Strict' });
    },

    logoutCustomer: (state) => {
      state.loginCustomer = {};
      Cookies.remove("loginCustomer");
    },

    setSelectedLocation: (state, action) => {
      state.loginCustomer = {
        ...state.loginCustomer,
        selectedLocation: action.payload,
      };
      Cookies.set("loginCustomer", JSON.stringify(state.loginCustomer), { expires: 1, secure: true, sameSite: 'Strict' });
    },
  },
});

export const { setLoginCustomer, logoutCustomer, setSelectedLocation } = customerSlice.actions;
export default customerSlice.reducer;
