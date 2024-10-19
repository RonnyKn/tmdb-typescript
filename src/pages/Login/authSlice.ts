import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isGuest: false,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) {
      const { username, password } = action.payload;
      if (username === "admin" && password === "admin") {
        state.isAuthenticated = true;
        state.isGuest = false;
        state.username = username;
        toast.success(`Logged in as ${username}`);
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isGuest = false;
      state.username = null;
      toast.success(`Logged out successfully`);
    },
    continueAsGuest(state) {
      state.isGuest = true;
      state.isAuthenticated = false;
      state.username = "Guest";
      toast.success(`Logged in as Guest`);
    },
  },
});

export const { login, logout, continueAsGuest } = authSlice.actions;
export default authSlice.reducer;
