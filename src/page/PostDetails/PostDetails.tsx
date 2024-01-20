import moment from "moment";

import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Divider,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import CommentSection from "../../components/PostDetails/CommentSection";
import { useSelector } from "react-redux";
import {
  getSinglePostAsync,
  selectPosts,
} from "../../components/Posts/postSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { status, singlePost: post } = useSelector(selectPosts);
  const { postId } = useParams();
  useEffect(() => {
    try {
      // @ts-ignore
      dispatch(getSinglePostAsync(postId));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, postId]);

  if (!postId) {
    return <Navigate to="/" />;
  }
  if (status === "loading") {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Grow in>
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              marginLeft: { xs: "20px", sm: 0 },
              display: "flex",
            }}
          >
            <img
              style={{
                borderRadius: "20px",
                objectFit: "cover",
                width: "100%",
                maxHeight: "600px",
              }}
              // @ts-ignore
              src={
                post?.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post?.title}
            />
          </Box>
          <Box
            sx={{
              borderRadius: "20px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "600px",
            }}
          >
            <Typography variant="h3" component="h3">
              {post?.title}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post?.message}
            </Typography>
            <Typography variant="h6">
              Created by: {post?.creator.name}
            </Typography>
            <Typography variant="body1">
              {moment(post?.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Divider style={{ margin: "20px 0" }} />
            <Divider style={{ margin: "20px 0" }} />
          </Box>
        </Box>
        <CommentSection post={post} />
      </Paper>
    </Grow>
  );
};

export default PostDetails;
