import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../../services/api";

const initialState = {
  token: localStorage.getItem("token") || null,
  status: "idle",
};

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const response = await login(credentials);
  const token = response.data.token;
  localStorage.setItem("token", token);
  return token;
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    const response = await register(userData);
    return Boolean(response.message);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
