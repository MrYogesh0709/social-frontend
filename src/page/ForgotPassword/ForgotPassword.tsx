import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Grow,
  Paper,
  Typography,
} from "@mui/material";
import Input from "../../components/Auth/Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  forgotPasswordRequestAsync,
  selectAuth,
} from "../../components/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector(selectAuth);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //@ts-ignore
      dispatch(forgotPasswordRequestAsync(email));
    } catch (error) {
      console.log(error);
    }
  };

  return status === "loading" ? (
    <Grow in>
      <Container
        sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}
      >
        <CircularProgress size="5rem" />
      </Container>
    </Grow>
  ) : (
    <Grow in>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Reset Password</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: "3rem" }}
          >
            <Grid container spacing={2}>
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: "2rem 0" }}
            >
              {status === "loading" ? "Mail Sending " : "Send Mail"}
            </Button>

            <Grid container justifyContent={"center"}>
              <Grid item>
                <Button component={Link} to="/auth" color="primary">
                  Go Back To Sign In Page
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default ForgotPassword;
