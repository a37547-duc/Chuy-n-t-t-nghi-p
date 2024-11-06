import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk để lấy tất cả sản phẩm trong giỏ hàng
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    const response = await axios.get('https://example.com/api/cart');
    return response.data;
  }
);
// Async thunk để thêm sản phẩm vào giỏ hàng
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item) => {
    const response = await axios.post('https://example.com/api/cart', item);
    return response.data;
  }
);

// Async thunk để xóa sản phẩm khỏi giỏ hàng
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (itemId) => {
    await axios.delete(`https://example.com/api/cart/${itemId}`);
    return itemId;
  }
);

// Async thunk để cập nhật sản phẩm trong giỏ hàng
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }) => {
    const response = await axios.put(`https://example.com/api/cart/${itemId}`, { quantity });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalAmount = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.totalAmount += action.payload.price * action.payload.quantity;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const itemId = action.payload;
        state.items = state.items.filter(item => item.id !== itemId);
        state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
          state.items[index] = updatedItem;
          state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        }
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//     totalAmount: 0,
//   },
//   reducers: {
//     // Reducer để thêm sản phẩm vào giỏ hàng
//     addItemToCart(state, action) {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//       state.totalAmount += action.payload.price * action.payload.quantity;
//     },
//     // Reducer để cập nhật sản phẩm trong giỏ hàng
//     updateCartItem(state, action) {
//       const { id, quantity } = action.payload;
//       const existingItem = state.items.find(item => item.id === id);
//       if (existingItem) {
//         const priceDifference = (quantity - existingItem.quantity) * existingItem.price;
//         existingItem.quantity = quantity;
//         state.totalAmount += priceDifference;
//       }
//     },
//     // Reducer để xóa sản phẩm khỏi giỏ hàng
//     removeItemFromCart(state, action) {
//       const itemId = action.payload;
//       const existingItem = state.items.find(item => item.id === itemId);
//       if (existingItem) {
//         state.totalAmount -= existingItem.price * existingItem.quantity;
//         state.items = state.items.filter(item => item.id !== itemId);
//       }
//     },
//     // Reducer để làm sạch giỏ hàng
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//     },
//   },
// });

// export const { addItemToCart, updateCartItem, removeItemFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
