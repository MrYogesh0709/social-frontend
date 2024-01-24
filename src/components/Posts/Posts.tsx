import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PostType, getAllPostsAsync, selectPosts } from "./postSlice";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import Post from "./Post/Post";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status, hasNextPage } = useSelector(selectPosts);
  const [page, setPage] = useState(1);
  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (post: HTMLDivElement | null) => {
      if (status === "loading") return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          // console.log("we are near last post");
          setPage((page) => page + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [status, hasNextPage]
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllPostsAsync(page));
  }, [dispatch, page]);

  const content = posts?.map((post: PostType, i) => (
    <Grid
      key={post._id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      ref={(el) => (posts.length - 1 === i ? lastPostRef(el) : null)}
    >
      <Post post={post} />
    </Grid>
  ));

  return (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.length > 0 ? (
        <>
          {content}
          {status === "loading" && (
            <Container sx={{ display: "grid", justifyContent: "center" }}>
              <CircularProgress size="5em" />
            </Container>
          )}
        </>
      ) : (
        <Container sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5">No posts available</Typography>
        </Container>
      )}
    </Grid>
  );
};

export default Posts;
