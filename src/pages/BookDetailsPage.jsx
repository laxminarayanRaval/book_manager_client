import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Container,
  CircularProgress,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { fetchBook, updateBook } from "../store/books/bookSlice";

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBook, status } = useSelector((state) => state.books);
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
    }
  }, [currentBook]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateBook({ id, title, author }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Failed to update the book:", error);
      });
  };

  if (status === "loading") return <CircularProgress />;
  if (!currentBook) return <Typography>Book not found</Typography>;

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </form>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {currentBook.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Author: {currentBook.author}
            </Typography>
            {isAuthenticated && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Book
              </Button>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default BookDetailsPage;
