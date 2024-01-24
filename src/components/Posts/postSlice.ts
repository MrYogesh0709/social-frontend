import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  likePost,
  updatePost,
  commentPost,
} from "./postAPI";

export type PostType = {
  _id: string;
  title: string;
  message: string;
  creator: { _id: string; name: string };
  selectedFile: File | null;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type InitialStateType = {
  posts: PostType[];
  singlePost: PostType | null;
  status: string;
  error: string;
  msg: string;
  totalPages: number;
  hasNextPage: boolean;
};

const initialState: InitialStateType = {
  status: "loading",
  posts: [],
  singlePost: null,
  error: "",
  msg: "",
  totalPages: 0,
  hasNextPage: false,
};

export const getAllPostsAsync = createAsyncThunk(
  "auth/getAllPosts",
  async (page, thunkAPI) => await getAllPosts(page, thunkAPI)
);
export const getSinglePostAsync = createAsyncThunk(
  "auth/getSinglePost",
  async (postId, thunkAPI) => await getSinglePost(postId, thunkAPI)
);
export const createPostAsync = createAsyncThunk(
  "auth/createPost",
  async (postData, thunkAPI) => await createPost(postData, thunkAPI)
);
export const updatePostAsync = createAsyncThunk(
  "auth/updatePost",
  async (postData, thunkAPI) => await updatePost(postData, thunkAPI)
);
export const deletePostAsync = createAsyncThunk(
  "auth/deletePost",
  async (postId, thunkAPI) => await deletePost(postId, thunkAPI)
);
export const likePostAsync = createAsyncThunk(
  "auth/likePost",
  async (postId, thunkAPI) => await likePost(postId, thunkAPI)
);
export const commentPostAsync = createAsyncThunk(
  "auth/commentPost",
  async (postId, thunkAPI) => await commentPost(postId, thunkAPI)
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostsAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.msg = "";
      })
      .addCase(getAllPostsAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.totalPages = payload.numberOfPages;
        state.posts = [...state.posts, ...payload.data];
        state.hasNextPage = Boolean(payload.data.length);
      })
      .addCase(getAllPostsAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(getSinglePostAsync.pending, (state) => {
        state.status = "loading";
        state.error = "";
        state.msg = "";
        state.singlePost = null;
      })
      .addCase(getSinglePostAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.singlePost = payload;
      })
      .addCase(getSinglePostAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(createPostAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.posts = [payload, ...state.posts];
      })
      .addCase(createPostAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(updatePostAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.posts = state.posts.map((post) =>
          post._id === payload._id ? payload : post
        );
        toast.success("Post Updated");
      })
      .addCase(updatePostAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(deletePostAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.posts = state.posts.filter((post) => post._id !== payload.postId);
        toast.success("Post Deleted");
      })
      .addCase(deletePostAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(likePostAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.posts = state.posts.map((item) =>
          item._id === payload._id ? payload : item
        );
      })
      .addCase(likePostAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      })
      .addCase(commentPostAsync.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.error = "";
        state.posts = state.posts.map((item) =>
          item._id === payload._id ? payload : item
        );
        state.singlePost = payload;
      })
      .addCase(commentPostAsync.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = (payload as { msg: string }).msg;
        toast.error(
          `${(payload as { msg: string }).msg}` || "something Went Wrong"
        );
      });
  },
});

export const selectPosts = (state: { posts: InitialStateType }) => state.posts;

export default postSlice.reducer;
