import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiConfig";
// Thunk để lấy danh sách bình luận theo sản phẩm ID
export const getCommentsByProductId = createAsyncThunk(
  "comments/getCommentsByProductId",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/ratings/${productId}`);
      // console.log("Data: ", response.data);
      const { totalRatings, starCounts, ratings } = response.data.data;
      return { totalRatings, starCounts, ratings }; // Trả về dữ liệu cần thiết
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Slice quản lý trạng thái comments
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    totalRatings: 0,  // Tổng số đánh giá
    starCounts: {},   // Số lượng đánh giá theo sao
    ratings: [],      // Danh sách bình luận
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        const { totalRatings, starCounts, ratings } = action.payload;
        state.totalRatings = totalRatings;
        state.starCounts = starCounts;
        state.ratings = ratings;
      })
      .addCase(getCommentsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
