import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { PostType, getAllPostsAsync, selectPosts } from "./postSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Posts = ({
  setCurrentId,
}: {
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector(selectPosts);

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  return status === "loading" ? (
    <Container sx={{ display: "grid", justifyContent: "center" }}>
      <CircularProgress size="5em" />
    </Container>
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.length > 0 ? (
        posts?.map((post: PostType) => (
          // <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
          <Grid key={post._id} item xs={12} sm={12} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))
      ) : (
        <Container sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5">No posts available</Typography>
        </Container>
      )}
    </Grid>
  );
};

export default Posts;
