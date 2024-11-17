import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/apiConfig';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hàm đăng ký user
// export const registerUser = createAsyncThunk(
//   'auth/registerUser', 
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/auth/register', userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   }
// );

// Hàm đăng nhập user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', formData);
      const token = response.data;
      if (token) {
        localStorage.setItem('access_token', token.user.data.token);
        localStorage.setItem('user', JSON.stringify(token.user.data));
      }
      return token;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi kết nối");
    }
  }
);

// Hàm lấy thông tin profile của người dùng
// export const getUserProfile = createAsyncThunk(
//   'auth/getUserProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('userToken');
//       // if (!token) {
//       //   throw new Error("Token không tồn tại");
//       // }
//       const response = await api.get('/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       toast.error("Không thể lấy thông tin người dùng");
//       return rejectWithValue(error.response);
//     }
//   }
// );

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('access_token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loginLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('access_token'),
  },
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
      state.loginLoading = false;
      state.isAuthenticated = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user'); 
      toast.success("Bạn đã đăng xuất");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      // .addCase(registerUser.pending, (state) => {
      //   state.registerLoading = true;
      // })
      // .addCase(registerUser.fulfilled, (state) => {
      //   state.registerLoading = false;
      //   toast.success("Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.");
      // })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.registerLoading = false;
      //   state.error = action.payload;
      //   toast.error(state.error || "Đăng ký thất bại. Vui lòng thử lại.");
      // })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.token = action.payload.user.data.token;
        state.user = action.payload.user.data;
        state.isAuthenticated = true;
        toast.success("Đăng nhập thành công");
        window.location.href = "/"
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload;
        toast.error(state.error || "Đăng nhập thất bại. Vui lòng thử lại.");
      });

      // Get User Profile
      // .addCase(getUserProfile.pending, (state) => {
      //   state.profileLoading = true;
      // })
      // .addCase(getUserProfile.fulfilled, (state, action) => {
      //   state.profileLoading = false;
      //   state.userProfile = action.payload;
      // })
      // .addCase(getUserProfile.rejected, (state, action) => {
      //   state.profileLoading = false;
      //   state.error = action.payload;
      //   toast.error(state.error || "Không thể lấy thông tin người dùng.");
      // });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
