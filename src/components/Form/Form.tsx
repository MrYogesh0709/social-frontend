import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../../app/localStorage";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  createPostAsync,
  selectPosts,
  updatePostAsync,
} from "../Posts/postSlice";
import { useSelector } from "react-redux";

type PostType = {
  title: string;
  message: string;
  selectedFile: File | null;
};
type FormPropsTypes = {
  currentId: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({ currentId, setCurrentId }: FormPropsTypes) => {
  const user = getUserFromLocalStorage();
  const { status } = useSelector(selectPosts);
  const dispatch = useDispatch();

  const [postData, setPostData] = useState<PostType>({
    title: "",
    message: "",
    selectedFile: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setPostData({ ...postData, selectedFile: files[0] });
    }
  };

  const { posts } = useSelector(selectPosts);
  const post = currentId ? posts.find((post) => post._id === currentId) : null;
  useEffect(() => {
    if (post) {
      setPostData((prevPostData) => ({
        ...prevPostData,
        title: post.title,
        message: post.message,
        selectedFile: post.selectedFile,
      }));
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentId) {
      if (!postData.title || !postData.message) {
        toast.error("Please select all details");
        return;
      }
    }
    if (!currentId) {
      if (!postData.title || !postData.message || !postData.selectedFile) {
        toast.error("Please select all details");
        return;
      }
    }

    if (currentId) {
      // @ts-ignore
      dispatch(updatePostAsync({ postData, currentId }));
      clear();
    }
    if (!currentId) {
      try {
        // @ts-ignore
        dispatch(createPostAsync(postData));
      } catch (error) {
        console.log(error);
      }
      clear();
    }
  };

  const clear = () => {
    setCurrentId("");
    setPostData({
      title: "",
      message: "",
      selectedFile: null,
    });
  };
  if (!user) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" align="center">
          Please Sign In to create Your Post
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper sx={{ padding: 2, position: { sm: "fixed" } }} elevation={6}>
      <form
        autoComplete="off"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          {currentId ? "Editing " : "Creating "} a Post
        </Typography>
        <TextField
          sx={{ mb: 1 }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          required
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ mb: 1 }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          required
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        {!currentId && (
          <Box
            sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              onChange={handleFileChange}
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button component="span">Select File</Button>
            </label>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {postData?.selectedFile
                ? postData?.selectedFile?.name
                : "No file selected"}
            </Typography>
          </Box>
        )}
        <Button
          sx={{ mb: 2 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {status === "loading" ? "Uploading..." : "Submit"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
