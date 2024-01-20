import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  forgotPasswordRequest,
  loginUser,
  resetPassword,
} from "./authAPI";
import { authType } from "../../page/Auth/Auth";
import {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../app/localStorage";
import { toast } from "react-toastify";

type InitialStateType = {
  user: string | null;
  status: string;
  error: string;
  msg: string | null;
};

const initialState = {
  user: null,
  status: "idle",
  error: "",
  msg: "",
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (data: authType, thunkAPI) => await createUser(data, thunkAPI)
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (data: authType, thunkAPI) => await loginUser(data, thunkAPI)
);

export const forgotPasswordRequestAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (data: string, thunkAPI) => await forgotPasswordRequest(data, thunkAPI)
);
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => await resetPassword(data, thunkAPI)
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      toast.success(`User Logged out`);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.msg = "";
      })
      .addCase(createUserAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.user = payload;
        addUserToLocalStorage(payload);
        toast.success("Signup Successfully");
      })
      .addCase(createUserAsync.rejected, (state, { payload }) => {
        console.log(payload);
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loginUserAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.user = payload;
        addUserToLocalStorage(payload);
        toast.success(`welcome back ${payload.result.name}`);
      })
      .addCase(loginUserAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(forgotPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.msg = "";
      })
      .addCase(forgotPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = "";
        state.msg = action.payload.msg;
        toast.success(`${action.payload.msg}`);
      })
      .addCase(forgotPasswordRequestAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.msg = "";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = "";
        state.msg = action.payload.msg;
        toast.success(`${action.payload.msg}`);
      })
      .addCase(resetPasswordAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      });
  },
});
export const { logoutUser } = authSlice.actions;

export const selectAuth = (state: { auth: InitialStateType }) => state.auth;

export default authSlice.reducer;
