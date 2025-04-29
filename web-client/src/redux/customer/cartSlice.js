import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  carts: Cookies.get('cartData') ? JSON.parse(Cookies.get('cartData')) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { restaurantID, restaurantName, deliveryFee, items } = action.payload;

      let existingCart = state.carts.find(cart => cart.restaurantID === restaurantID);

      if (!existingCart) {
        existingCart = {
          restaurantID,
          restaurantName,
          deliveryFee,
          items: [],
        };
        state.carts.push(existingCart);
      }

      items.forEach((newItem) => {
        const existingItem = existingCart.items.find(
          (i) => i.itemID === newItem.itemID && i.selectedSize === newItem.selectedSize
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          existingCart.items.push(newItem);
        }
      });
      Cookies.set('cartData', JSON.stringify(state.carts), { expires: 1, secure: true, sameSite: 'Strict' });
    },

    removeFromCart: (state, action) => {
      const { restaurantID, itemID, selectedSize } = action.payload;

      const cart = state.carts.find(cart => cart.restaurantID === restaurantID);
      if (!cart) return;

      cart.items = cart.items.filter(
        item => !(item.itemID === itemID && item.selectedSize === selectedSize)
      );

      if (cart.items.length === 0) {
        state.carts = state.carts.filter(c => c.restaurantID !== restaurantID);
      }
      Cookies.set('cartData', JSON.stringify(state.carts), { expires: 1, secure: true, sameSite: 'Strict' });
    },
        
    removeCart : (state, action) => {
      const { restaurantID } = action.payload;
      state.carts = state.carts.filter(c => c.restaurantID !== restaurantID);
      Cookies.set('cartData', JSON.stringify(state.carts), { expires: 1, secure: true, sameSite: 'Strict' }); 
    },    

    clearCart: (state) => {
      state.carts = [];
      Cookies.remove('cartData');
    },
  },
});

export const { addToCart, removeFromCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
