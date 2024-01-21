import { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Zoom,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Input from "../../components/Auth/Input";
import { useDispatch } from "react-redux";
import {
  createUserAsync,
  loginUserAsync,
  selectAuth,
} from "../../components/Auth/authSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUserFromLocalStorage } from "../../app/localStorage";

export type authType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<authType>(initialState);
  const { status } = useSelector(selectAuth);
  const user = getUserFromLocalStorage();

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignUp && (!formData.email || !formData.password)) {
      toast.error("Please Provide all Fields");
      return;
    }
    if (
      isSignUp &&
      (!formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.name)
    ) {
      toast.error("Please Provide all Fields");
      return;
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    if (isSignUp) {
      try {
        // @ts-ignore
        dispatch(createUserAsync(formData));
        setFormData(initialState);
      } catch (error) {
        console.log(error);
      }
      e.currentTarget.reset();
    } else {
      try {
        // @ts-ignore
        dispatch(loginUserAsync(formData));
        setFormData(initialState);
      } catch (error) {
        console.log(error);
      }
      e.currentTarget.reset();
    }
  };

  if (user) {
    return <Navigate to="/posts" replace={true} />;
  }

  return (
    <Zoom in={true}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>

          <Typography variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ width: "100%", marginTop: "3rem" }}
          >
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="name"
                    label="User Name"
                    handleChange={handleChange}
                    autoFocus
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: "2rem 0" }}
            >
              {status === "loading"
                ? "loading"
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </Button>

            <Grid container justifyContent={"center"}>
              <Grid item>
                <Button component={Link} size="small" to="/forgot-password">
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Zoom>
  );
};

export default Auth;
