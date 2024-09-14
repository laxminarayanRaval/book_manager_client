import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/auth/authSlice";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MenuBookIcon sx={{ fontSize: 32, marginRight: 1 }} />
            <Typography
              variant="h5"
              component={RouterLink}
              to="/books"
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Book Manager
            </Typography>
          </Box>
          <Box>
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/add-book"
                  sx={{ mr: 2 }}
                >
                  Add Book
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="secondary"
                  variant="contained"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                  sx={{ ml: 1 }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
