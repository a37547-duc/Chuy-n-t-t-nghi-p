import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    originalPrice: 0,
    cartTotal: 0, // Tổng giá trị giỏ hàng
    discount: 0, // Thông tin giảm giá (ban đầu là null)
    isApplied: false, // Thêm trạng thái isApplied
  },
  reducers: {
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload; // Cập nhật cartTotal
    },
    setDiscountInfo: (state, action) => {
      state.discount = action.payload; // Cập nhật thông tin giảm giá
    },
    setOriginalPrice: (state, action) => {
      state.originalPrice = action.payload; // Giá ban đầu
    },
    setIsApplied: (state, action) => {
      state.isApplied = action.payload; // Cập nhật trạng thái isApplied
    },
    clearDiscountInfo: (state) => {
      state.discount = null; // Xóa thông tin giảm giá
      state.isApplied = false; // Reset isApplied
    },
  },
});

export const { setCartTotal, setDiscountInfo, clearDiscountInfo, setOriginalPrice, setIsApplied } = discountSlice.actions;

export default discountSlice.reducer;