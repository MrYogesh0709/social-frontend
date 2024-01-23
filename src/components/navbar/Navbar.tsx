import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import { jwtDecode } from "jwt-decode";
import { getUserFromLocalStorage } from "../../app/localStorage";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Auth/authSlice";

export type User = {
  result: { name: string; email: string; id: string };
  token: string;
} | null;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>(getUserFromLocalStorage());
  const checkTokenExpiry = (user: User) => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) {
        navigate("/logout");
        dispatch(logoutUser());
        setUser(null);
      }
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (typeof storedUser === "string") {
      setUser(JSON.parse(storedUser));
      try {
        const parsedUser = JSON.parse(storedUser);
        checkTokenExpiry(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, navigate]);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOutUser = () => {
    setUser(null);
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/" style={{ color: "inherit" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Link>
          <Link to="/" style={{ color: "inherit" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Social
            </Typography>
          </Link>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            component={Link}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
          >
            <AdbIcon />
          </IconButton>

          <Typography
            component={Link}
            to="/"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SOCIAL
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`${user ? "Open settings" : "Sign In"}`}>
              <IconButton onClick={handleOpenUserMenu}>
                {user ? (
                  <Avatar
                    alt={user.result?.name}
                    sx={{ background: "white", color: "blue" }}
                  >
                    {user?.result?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar sx={{ background: "white" }}>
                    <LoginIcon color="success" />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    setUser(null);
                  }}
                >
                  <Typography
                    textAlign="center"
                    onClick={signOutUser}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to="/auth"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Sign In
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
