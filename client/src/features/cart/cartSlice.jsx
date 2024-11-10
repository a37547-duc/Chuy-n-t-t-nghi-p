import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    cartTotalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    // Add item to cart
    addItemToCart(state, action) {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        toast.info("Thêm sản phẩm thành công");
      } else {
        state.items.push(action.payload);
        toast.success("Thêm sản phẩm thành công");
      }
      state.totalAmount += action.payload.price * action.payload.quantity;
      state.cartTotalQuantity += action.payload.quantity;
    },
    // Update item quantity in cart
    updateCartItem(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      if (existingItem) {
        const priceDifference = (quantity - existingItem.quantity) * existingItem.price;
        state.cartTotalQuantity += (quantity - existingItem.quantity);
        existingItem.quantity = quantity;
        state.totalAmount += priceDifference;
        toast.success("Cập nhập sản phẩm thành công");
      }
    },
    // Remove item from cart
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item._id === itemId);
      if (existingItem) {
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartTotalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item._id !== itemId);
      }
    },
    // Clear cart
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.cartTotalQuantity = 0;
    },
  },
});

export const { addItemToCart, updateCartItem, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
