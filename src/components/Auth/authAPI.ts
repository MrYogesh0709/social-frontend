import api from "../../app/api";
import { authType } from "../../page/Auth/Auth";

//@ts-ignore
export const createUser = async (userData: authType, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/signup", userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

//@ts-ignore
export const loginUser = async (userData: authType, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/signin", userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

//@ts-ignore
export const forgotPasswordRequest = async (email: string, thunkAPI) => {
  try {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

//@ts-ignore
export const resetPassword = async (userData, thunkAPI) => {
  const { email, token, password, confirmPassword } = userData;
  try {
    const { data } = await api.post("/auth/reset-password", {
      email,
      token,
      password,
      confirmPassword,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
