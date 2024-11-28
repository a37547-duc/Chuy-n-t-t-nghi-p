// src/redux/slices/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: null,  // Lưu tên danh mục
  brandName: localStorage.getItem("selectedBrand") || null,     // Lưu tên thương hiệu
  minPrice: null,      // Lưu giá tối thiểu
  maxPrice: null,      // Lưu giá tối đa
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    setBrandName: (state, action) => {
      localStorage.setItem("selectedBrand", action.payload);
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
});

export const { setCategoryName, setBrandName, setMinPrice, setMaxPrice } = filterSlice.actions;
export default filterSlice.reducer;