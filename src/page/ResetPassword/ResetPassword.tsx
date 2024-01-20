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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  resetPasswordAsync,
  selectAuth,
} from "../../components/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
type ResetPasswordType = {
  password: string;
  confirmPassword: string;
};
const ResetPassword = () => {
  const [formData, setFormData] = useState<ResetPasswordType>({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { status } = useSelector(selectAuth);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password Does not Match");
        return;
      }
      dispatch(
        //@ts-ignore
        resetPasswordAsync({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          token: query.get("token"),
          email: query.get("email"),
        })
      );
      navigate("/auth");
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
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ margin: "2rem 0" }}
              >
                Reset Password
              </Button>
            </Grid>
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

export default ResetPassword;
