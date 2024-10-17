import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Thunk để thêm variation cho sản phẩm
export const addVariation = createAsyncThunk(
  'variation/addVariation',
  async ({ productId, variationData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://laptech4k.onrender.com/api/v1/admin/products/variants/add/${productId}`,
        variationData
      );
      return response.data;
    } catch (error) {
      // Kiểm tra lỗi trả về từ API
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  variations: [],
  loading: false,
  error: null,
};

const adminVariationSlice = createSlice({
  name: 'variation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVariation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVariation.fulfilled, (state, action) => {
        state.loading = false;
        state.variations.push(action.payload);
        toast.success("Thêm biến thể thành công!");
      })
      .addCase(addVariation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Thêm biến thể thất bại. Vui lòng thử lại!");
      });
  },
});

export default adminVariationSlice.reducer;
