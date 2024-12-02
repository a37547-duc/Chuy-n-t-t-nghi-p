// src/redux/slices/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: null, 
  brandName: null,
  minPrice: null,
  maxPrice: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    setBrandName: (state, action) => {
      state.brandName = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    resetFilter: () => {
      console.log("Filters have been reset");
      return initialState;
    },
  },
});

export const { setCategoryName, setBrandName, setMinPrice, setMaxPrice, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;