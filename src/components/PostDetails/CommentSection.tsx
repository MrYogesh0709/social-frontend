import { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { PostType, commentPostAsync } from "../Posts/postSlice";
import { getUserFromLocalStorage } from "../../app/localStorage";
import { useDispatch } from "react-redux";
import { Send } from "@mui/icons-material";

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
        <Box sx={{ maxHeight: "500px", overflowY: "auto", py: 2 }}>
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
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              fullWidth
              minRows={1}
              variant="outlined"
              label="Add Your comment Here"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ marginRight: "10px" }}
            />
            {comment && (
              <Button
                style={{ position: "absolute", right: "0px", bottom: "10px" }}
                onClick={handleClick}
              >
                <Send />
              </Button>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default CommentSection;
