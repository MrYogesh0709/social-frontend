import api from "../../app/api";

//@ts-ignore
export const getAllPosts = async (_, thunkAPI) => {
  try {
    const { data } = await api("/post");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

//@ts-ignore
export const getSinglePost = async (postId, thunkAPI) => {
  try {
    const { data } = await api(`/post/${postId}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

//@ts-ignore
export const createPost = async (postData, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("message", postData.message);
    formData.append("selectedFile", postData.selectedFile);

    const { data } = await api.post(`/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
//@ts-ignore
export const updatePost = async (postData, thunkAPI) => {
  const { title, message } = postData.postData;
  const { currentId } = postData;
  try {
    const { data } = await api.patch(`/post/${currentId}`, { title, message });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
//@ts-ignore
export const deletePost = async (postId, thunkAPI) => {
  try {
    const { data } = await api.delete(`/post/${postId}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
//@ts-ignore
export const likePost = async (postId, thunkAPI) => {
  try {
    const { data } = await api.patch(`/post/${postId}/likePost`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
//@ts-ignore
export const commentPost = async (postData, thunkAPI) => {
  const { postId } = postData;
  const { finalComment } = postData;
  try {
    const { data } = await api.patch(`/post/${postId}/commentPost`, {
      value: finalComment,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
