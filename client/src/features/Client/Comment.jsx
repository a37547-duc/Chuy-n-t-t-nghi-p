import { toast } from "react-toastify";
import { api } from "../../api/apiConfig";
import "react-toastify/dist/ReactToastify.css";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk để gọi API gửi đánh giá sản phẩm
export const postRating = createAsyncThunk(
  "rating/postRating",
  async (ratingData, { rejectWithValue }) => {
    try {
      const response = await api.post("/rating/post", ratingData);
      return response.data;
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
        state.rating = action.payload;
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
