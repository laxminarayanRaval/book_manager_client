import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import theme from "./theme";
import { store } from "./store/store";
import BooksPage from "./pages/BooksPage";
import LoginPage from "./pages/LoginPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import AddBookPage from "./pages/AddBookPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/books/:id"
              element={
                <ProtectedRoute>
                  <BookDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-book"
              element={
                <ProtectedRoute>
                  <AddBookPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
