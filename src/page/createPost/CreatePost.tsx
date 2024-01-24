import {
  Box,
  Button,
  Container,
  Grow,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getUserFromLocalStorage } from "../../app/localStorage";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createPostAsync } from "../../components/Posts/postSlice";
import { useNavigate } from "react-router-dom";

type PostType = {
  title: string;
  message: string;
  selectedFile: File | null;
};

const CreatePost = () => {
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postData.title || !postData.message) {
      toast.error("Please select all details");
      return;
    }
    if (!postData.selectedFile) {
      toast.error("Please Select File");
      return;
    }

    try {
      // @ts-ignore
      dispatch(createPostAsync(postData));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    clear();
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      selectedFile: null,
    });
  };

  if (!user) {
    return (
      <Grow in>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" align="center">
            Please Sign In to create Your Post
          </Typography>
        </Paper>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            alignItems: "center",
          }}
        >
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
              Creating a Post
            </Typography>
            <TextField
              sx={{ mb: 1 }}
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData.title}
              required
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
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
            <Button
              sx={{ mb: 2 }}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              disabled={!postData.title || !postData.message}
            >
              Submit
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
      </Container>
    </Grow>
  );
};

export default CreatePost;
