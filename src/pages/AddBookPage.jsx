import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addNewBook } from "../store/books/bookSlice";
import { useNavigate, Navigate } from "react-router-dom";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewBook({ title, author }))
      .unwrap()
      .then(() => {
        navigate("/books");
      })
      .catch((error) => {
        console.error("Failed to add the book:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Book
        </Typography>
        <form onSubmit={handleSubmit}>
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
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Book
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddBookPage;
