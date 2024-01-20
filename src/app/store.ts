import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/Auth/authSlice";
import productReducer from "../components/Posts/postSlice";

export const store = configureStore({
  reducer: {
    posts: productReducer,
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
