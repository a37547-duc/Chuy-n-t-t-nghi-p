import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiConfig";

// Thunk để gọi API thêm brand
export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (newBrand, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/products/brand/create", newBrand);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi thêm thương hiệu.");
    }
  }
);

// Thunk để gọi API sửa brand
export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ id, editBrand }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/products/brand/update/${id}`, editBrand);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi sửa thương hiệu.");
    }
  }
);

// Thunk để gọi API xóa brand
export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/products/brand/delete/${id}`);
      return { id }; // Trả về `id` đã xóa để cập nhật state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi xóa thương hiệu.");
    }
  }
);

const initialState = {
  brands: [],
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const handleBrandUpdate = (state, action) => {
  const index = state.brands.findIndex((brand) => brand._id === action.payload._id);
  if (index !== -1) {
    state.brands[index] = action.payload;
  }
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Thêm brand
      .addCase(addBrand.pending, handlePending)
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload);
      })
      .addCase(addBrand.rejected, handleRejected)

      // Sửa brand
      .addCase(updateBrand.pending, handlePending)
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        handleBrandUpdate(state, action);
      })
      .addCase(updateBrand.rejected, handleRejected)

      // Xóa brand
      .addCase(deleteBrand.pending, handlePending)
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter((brand) => brand._id !== action.payload.id);
      })
      .addCase(deleteBrand.rejected, handleRejected);
  },
});

export default brandSlice.reducer;