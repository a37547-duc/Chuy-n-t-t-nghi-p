import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios

export const getUserTier = createAsyncThunk(
  "userTier/getUserTier",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://laptech4k.onrender.com/${userId}/tier`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const userTierSlice = createSlice({
  name: "userTier",
  initialState: {
    userId: "",
    username: "",
    totalSpent: 0,
    tier: "",
    tiers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTier.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.totalSpent = action.payload.totalSpent;
        state.tier = action.payload.tier;
        state.tiers = action.payload.tiers;
      })
      .addCase(getUserTier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userTierSlice.reducer;
