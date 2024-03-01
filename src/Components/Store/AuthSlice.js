import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  email: null,
  isLogin: false,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState: initialAuthState,
  reducers: {
    loginUser: (state, action) => {
      state.isLogin = true;
      state.token = action.payload[0];
      state.email = action.payload[1];
      localStorage.setItem("authToken", state.token);
      localStorage.setItem("email", state.email);
    },
    logoutUser: (state, action) => {
      state.isLogin = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
