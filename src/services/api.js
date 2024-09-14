import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.log("Unauthorized access - redirecting to login");
        // Add logic to redirect to login page or refresh token
      } else if (status >= 500) {
        console.error("Server error - please try again later");
      }
    }
    return Promise.reject(error);
  }
);

export const fetchBooks = () => api.get("/books");
export const fetchBook = (id) => api.get(`/books/${id}`);
export const addBook = (book) => api.post("/books", book);
export const updateBook = (id, updates) => api.put(`/books/${id}`, updates);
export const deleteBook = (id) => api.delete(`/books/${id}`);
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userData) => api.post("/auth/register", userData);
