import { api } from "../../api/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk để lấy tất cả sản phẩm với query string
export const getAllProductsClient = createAsyncThunk(
  "product/getAllProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      // Chuyển đổi params thành query string nếu có
      const queryString = new URLSearchParams(params).toString();
      
      // Gọi API với query string (nếu có)
      const response = await api.get(`/products${queryString ? `?${queryString}` : ""}`);
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái khi gọi API đang thực hiện
      .addCase(getAllProductsClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Xử lý khi gọi API thành công
      .addCase(getAllProductsClient.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      // Xử lý khi gọi API thất bại
      .addCase(getAllProductsClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;