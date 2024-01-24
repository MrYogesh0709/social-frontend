import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PostType, getAllPostsAsync, selectPosts } from "./postSlice";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import Post from "./Post/Post";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector(selectPosts);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const page = 1;
  useEffect(() => {
    // @ts-ignore
    dispatch(getAllPostsAsync(page));
  }, [dispatch, page]);

  if (status === "loading") {
    return (
      <Container sx={{ display: "grid", justifyContent: "center" }}>
        <CircularProgress size="5em" />
      </Container>
    );
  }

  return (
    <>
      <Grid container alignItems="stretch" spacing={3}>
        {posts.length > 0 ? (
          posts?.map((post: PostType) => (
            <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
              <Post post={post} />
            </Grid>
          ))
        ) : (
          <Container sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h5">No posts available</Typography>
          </Container>
        )}
      </Grid>
    </>
  );
};

export default Posts;
