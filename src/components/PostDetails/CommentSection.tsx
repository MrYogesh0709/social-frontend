import { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { PostType, commentPostAsync } from "../Posts/postSlice";
import { getUserFromLocalStorage } from "../../app/localStorage";
import { useDispatch } from "react-redux";

type CommentPropType = {
  post: PostType | null;
};

const CommentSection = ({ post }: CommentPropType) => {
  const [comment, setComment] = useState("");
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const commentsRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef<boolean>(false);

  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`;
    // @ts-ignore
    dispatch(commentPostAsync({ finalComment, postId: post._id }));
    setComment("");
    shouldScrollRef.current = true;
  };
  // scroll to bottom
  useEffect(() => {
    if (shouldScrollRef.current && commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
      shouldScrollRef.current = false;
    }
  }, [post?.comments]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "200px", overflowY: "auto", marginRight: "30px" }}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {!!post?.comments &&
            post.comments.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            ))}
          <div ref={commentsRef} />
        </Box>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </Box>
    </>
  );
};

export default CommentSection;
