import { toast } from "react-toastify";
import { api } from "../../api/apiConfig";
import "react-toastify/dist/ReactToastify.css";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Hàm lấy thông tin profile của người dùng
export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/account");
      return response.data;
    } catch (error) {
      if (!toast.isActive("getUserProfileError")) {
        toast.error("Không thể lấy thông tin người dùng", { toastId: "getUserProfileError" });
      }
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Hàm cập nhật thông tin profile người dùng
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/user/account/update", updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const initialState = {
  useProfile: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const authProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, handlePending)
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.useProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, handlePending)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.useProfile = { ...state.useProfile, ...action.payload };
        toast.success("Cập nhật thông tin thành công!");
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Cập nhật thông tin thất bại");
      });
  },
});

export default authProfileSlice.reducer;
