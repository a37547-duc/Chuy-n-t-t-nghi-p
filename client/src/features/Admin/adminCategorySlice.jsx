import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiConfig";

// Thunk để gọi API thêm danh mục
export const addCategories = createAsyncThunk(
  "category/addCategories",
  async (newCategory,  { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/products/category/create", newCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi thêm danh mục.");
    }
  }
);

// Thunk để gọi API sửa danh mục
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, editCategory }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/products/category/update/${id}`, editCategory);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi sửa danh mục.");
    }
  }
);

// Thunk để gọi API xóa danh mục
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/products/category/delete/${id}`);
      return { id }; // Trả về `id` đã xóa để cập nhật state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi xóa danh mục.");
    }
  }
);

const initialState = {
  categories: [],
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

const handleCategoryUpdate = (state, action) => {
  const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
  if (index !== -1) {
    state.categories[index] = action.payload;
  }
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Thêm danh mục
      .addCase(addCategories.pending, handlePending)
      .addCase(addCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategories.rejected, handleRejected)

      // Sửa danh mục
      .addCase(updateCategory.pending, handlePending)
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        handleCategoryUpdate(state, action);
      })
      .addCase(updateCategory.rejected, handleRejected)

      // Xóa danh mục
      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat._id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, handleRejected);
  },
});

export default categorySlice.reducer;