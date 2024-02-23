import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./AuthSlice";
import { MailSlice } from "./MailSlice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, mail: MailSlice.reducer },
});

export default store;
