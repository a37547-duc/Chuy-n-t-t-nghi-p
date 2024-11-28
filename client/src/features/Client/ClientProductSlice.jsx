// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../api/apiConfig";

// // Thunk để lấy tất cả sản phẩm với query string
// export const getAllProductsClient = createAsyncThunk(
//   "product/getAllProducts",
//   async (params, { rejectWithValue }) => {
//     try {
//       // Chuyển đổi params thành query string
//       const queryString = new URLSearchParams(params).toString();
//       // Gọi API với query string
//       const response = await api.get(`/products${queryString ? `?${queryString}` : ""}`);
//       return response.data;
//     } catch (error) {
//       // Kiểm tra lỗi 404 và trả về mảng rỗng
//       if (error.response && error.response.status === 404) {
//         return [];
//       }
//       return rejectWithValue(error.response.data); // Xử lý các lỗi khác
//     }
//   }
// );

// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Xử lý trạng thái khi gọi API đang thực hiện
//       .addCase(getAllProductsClient.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       // Xử lý khi gọi API thành công
//       .addCase(getAllProductsClient.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload; // Lưu sản phẩm vào state
//       })
//       // Xử lý khi gọi API thất bại
//       .addCase(getAllProductsClient.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Lưu thông tin lỗi vào state
//       });
//   },
// });

// export default productSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiConfig";

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
      // Kiểm tra lỗi 404 và trả về mảng rỗng
      if (error.response && error.response.status === 404) {
        return [];
      }
      return rejectWithValue(error.response.data); // Xử lý các lỗi khác
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
        state.products = action.payload; // Lưu sản phẩm vào state
      })
      // Xử lý khi gọi API thất bại
      .addCase(getAllProductsClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu thông tin lỗi vào state
      });
  },
});

export default productSlice.reducer;