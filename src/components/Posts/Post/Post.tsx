import { useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import {
  Delete,
  MoreHorizRounded,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import { getUserFromLocalStorage } from "../../../app/localStorage";
import { PostType, deletePostAsync, likePostAsync } from "../postSlice";
import { useDispatch } from "react-redux";

type SinglePost = {
  post: PostType;
};

const Post = ({ post }: SinglePost) => {
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?.id;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleLike = () => {
    // @ts-ignore
    dispatch(likePostAsync(post._id));
    if (hasLikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleEditClick = () => {
    navigate({ pathname: `/posts/edit/${post._id}` }, { state: post });
  };
  return (
    <Card
      raised
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
      }}
    >
      <ButtonBase
        name="test"
        sx={{ display: "block", textAlign: "initial" }}
        onClick={openPost}
      >
        <CardMedia
          sx={{
            height: 0,
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backgroundBlendMode: "darken",
          }}
          // @ts-ignore
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            color: "white",
          }}
        >
          <Typography variant="h6">{post.creator.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
      </ButtonBase>

      <Typography sx={{ padding: "0 16px" }} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message.substring(0, 150)}
          {post.message.length > 150 && (
            <Button component={Link} size="small" to={`/posts/${post._id}`}>
              {" "}
              ...Read More
            </Button>
          )}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {user?.result?.id === post?.creator?._id && (
          <Tooltip title="Edit Post">
            <Button
              style={{ color: "black" }}
              size="small"
              onClick={handleEditClick}
            >
              <MoreHorizRounded fontSize="medium" />
            </Button>
          </Tooltip>
        )}

        <Box sx={{ ml: "auto" }}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>
          {user?.result?.id === post?.creator?._id && (
            <Tooltip title="Delete">
              <Button
                size="small"
                color="primary"
                // @ts-ignore
                onClick={() => dispatch(deletePostAsync(post._id))}
              >
                <Delete fontSize="small" />
                delete
              </Button>
            </Tooltip>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default Post;
