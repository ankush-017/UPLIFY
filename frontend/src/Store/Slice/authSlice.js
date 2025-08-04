import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("uplify_user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    isAuthenticated: !!storedUser,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("uplify_user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("uplify_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;