import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk để gọi API lấy thương hiệu theo ID
export const getBrandById = createAsyncThunk(
  "brand/getBrandById",
  async (brandId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://laptech4k.onrender.com/api/v1/admin/products/brand/${brandId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk để gọi API lấy tất cả thương hiệu
export const getAllBrands = createAsyncThunk(
  "brand/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://laptech4k.onrender.com/api/v1/admin/products/brand");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Trạng thái khi đang tải thương hiệu
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Trạng thái khi tải thương hiệu thành công
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      // Trạng thái khi tải thương hiệu thất bại
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
