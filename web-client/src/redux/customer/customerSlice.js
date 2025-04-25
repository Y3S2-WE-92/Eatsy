import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginCustomer: {},
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLoginCustomer: (state, action) => {
      state.loginCustomer = action.payload;
    },

    setSelectedLocation: (state, action) => {
      state.loginCustomer = {
        ...state.loginCustomer,
        selectedLocation: action.payload,
      };
    },

    logoutCustomer: (state) => {
      state.loginCustomer = null;
    },
  },
});

export const { setLoginCustomer, logoutCustomer, setSelectedLocation } =
  customerSlice.actions;
export default customerSlice.reducer;
