import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [], // each cart is per restaurantID
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { restaurantID, items } = action.payload;
    
      let existingCart = state.carts.find(cart => cart.restaurantID === restaurantID);
    
      if (!existingCart) {
        // If no cart exists for the restaurant, create a new one
        existingCart = {
          restaurantID,
          items: [],
        };
        state.carts.push(existingCart);
      }
    
      // Now handle each item in one go
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
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
