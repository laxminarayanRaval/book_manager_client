import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBooks,
  addBook,
  fetchBook as apiFetchBook,
  updateBook as apiUpdateBook,
} from "../../services/api";

export const getBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetchBooks();
  return response.data;
});

export const addNewBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await addBook(book);
  return response.data;
});

export const fetchBook = createAsyncThunk("books/fetchBook", async (id) => {
  const response = await apiFetchBook(id);
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, ...updates }) => {
    const response = await apiUpdateBook(id, updates);
    return response.data;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: { items: [], currentBook: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getBooks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.currentBook = action.payload;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.currentBook = action.payload;
      });
  },
});

export default bookSlice.reducer;
