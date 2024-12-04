import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../api/apiConfig";

// Thunk để gọi API gửi đánh giá sản phẩm
export const postRating = createAsyncThunk(
  "rating/postRating",
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await api.post("/rating/post", ratingData); // API gửi đánh giá
      return response.data; // Dữ liệu trả về từ API sẽ được trả về đây
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi gửi đánh giá.");
    }
  }
);

const initialState = {
  rating: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRating.pending, handlePending)
      .addCase(postRating.fulfilled, (state, action) => {
        state.loading = false;
        state.rating = action.payload; // Cập nhật rating với dữ liệu trả về từ API
        toast.success("Đánh giá của bạn đã được gửi thành công!");
      })
      .addCase(postRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Gửi đánh giá thất bại. Vui lòng thử lại!");
      });
  },
});

export default ratingSlice.reducer;
