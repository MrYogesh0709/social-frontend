import {
  Button,
  Container,
  Grow,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../../app/localStorage";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { updatePostAsync } from "../../components/Posts/postSlice";

type PostType = {
  title: string;
  message: string;
};

const EditPost = () => {
  const { state } = useLocation();
  const currentId = state ? state._id : null;
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostType>({
    title: "",
    message: "",
  });

  useEffect(() => {
    if (state) {
      setPostData((prevPostData) => ({
        ...prevPostData,
        title: state.title,
        message: state.message,
      }));
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postData.title || !postData.message) {
      toast.error("Please select all details");
      return;
    }
    // @ts-ignore
    dispatch(updatePostAsync({ postData, currentId }));
    navigate("/");
    clear();
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
    });
  };

  if (!user) {
    return (
      <Grow in>
        <Container maxWidth={"lg"}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              Please Sign In to create Your Post
            </Typography>
            <Button component={Link} to="/auth" variant="contained">
              Sign In
            </Button>
          </Paper>
        </Container>
      </Grow>
    );
  }
  if (!state) {
    return <Navigate to="/" />;
  }
  return (
    <Grow in>
      <Container component="main" maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          {" "}
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
              Editing a Post
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

export default EditPost;
