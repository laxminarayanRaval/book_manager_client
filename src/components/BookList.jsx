import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, updateBook } from "../store/books/bookSlice";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  CardActions,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import bookImage from "../assets/book.jpg";
import { Link } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items);
  const status = useSelector((state) => state.books.status);
  const isAuthenticated = useSelector((state) => !!state.auth.token);

  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(getBooks());
    }
  }, [dispatch, status]);

  const handleClickOpen = (book) => {
    if (isAuthenticated) {
      setSelectedBook(book);
      setTitle(book.title);
      setAuthor(book.author);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleUpdate = () => {
    dispatch(updateBook({ id: selectedBook._id, title, author }))
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.error("Failed to update the book:", error);
      });
  };

  if (status === "loading") return <CircularProgress />;
  if (status === "failed")
    return <Typography color="error">Error loading books</Typography>;

  return (
    <>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="230"
                  image={bookImage}
                  alt={book.title}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box component={Link} to={`/books/${book._id}`}>
                    <Typography variant="h6" noWrap>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.author}
                    </Typography>
                  </Box>
                  <CardActions>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickOpen(book);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Author"
            type="text"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookList;
