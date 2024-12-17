import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../api/apiConfig";

// Thunk để gọi API thêm hạng
export const addTiers = createAsyncThunk(
  "tiers/addTiers",
  async (newTier, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/tiers/create", newTier);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi thêm hạng.");
    }
  }
);

// Thunk để gọi API sửa hạng
export const updateTier = createAsyncThunk(
  "tiers/updateTier",
  async ({ id, editTier }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/tiers/update/${id}`, editTier);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi sửa hạng.");
    }
  }
);

// Thunk để gọi API xóa hạng
export const deleteTiers = createAsyncThunk(
  "tiers/deleteTier",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/tiers/delete/${id}`);
      return { id }; // Trả về `id` đã xóa để cập nhật state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi xóa hạng.");
    }
  }
);

const initialState = {
  tiers: [],
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleTierUpdate = (state, action) => {
  const index = state.tiers.findIndex((tier) => tier._id === action.payload._id);
  if (index !== -1) {
    state.tiers[index] = action.payload;
  }
};

const tierSlice = createSlice({
  name: "tiers",
  initialState,
  reducers: {}, // Không có reducer nào cần ở đây
  extraReducers: (builder) => {
    builder
      // Thêm hạng
      .addCase(addTiers.pending, handlePending)
      .addCase(addTiers.fulfilled, (state, action) => {
        state.loading = false;
        state.tiers.push(action.payload); // Sử dụng tiers
        toast.success("Thêm hạng thành công!");
      })
      .addCase(addTiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Thêm hạng thất bại. Vui lòng thử lại!");
      })

      // Sửa hạng
      .addCase(updateTier.pending, handlePending)
      .addCase(updateTier.fulfilled, (state, action) => {
        state.loading = false;
        handleTierUpdate(state, action); // Sử dụng tiers
        toast.success("Sửa hạng thành công!");
      })
      .addCase(updateTier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Sửa hạng thất bại. Vui lòng thử lại!");
      })

      // Xóa hạng
      .addCase(deleteTiers.pending, handlePending)
      .addCase(deleteTiers.fulfilled, (state, action) => {
        state.loading = false;
        state.tiers = state.tiers.filter((tier) => tier._id !== action.payload.id); // Sử dụng tiers
        toast.success("Xóa hạng thành công!");
      })
      .addCase(deleteTiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Xóa hạng thất bại. Vui lòng thử lại!");
      });
  },
});

export default tierSlice.reducer;
