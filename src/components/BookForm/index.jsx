import { Paper, Typography } from "@mui/material";
import useForm from "../../hooks/useForm";
import { BookFormProvider } from "./BookFormContext";
import BookFormInput from "./BookFormInput";
import BookFormSubmit from "./BookFormSubmit";

const initialState = { title: "", author: "" };

const validate = (values) => {
  const errors = {};
  if (!values.title) errors.title = "Title is required";
  if (!values.author) errors.author = "Author is required";
  return errors;
};

const BookForm = ({ onSubmit, initialValues = initialState }) => {
  const formProps = useForm(initialValues, validate);

  return (
    <BookFormProvider value={formProps}>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          {initialValues.id ? "Edit Book" : "Add New Book"}
        </Typography>
        <form onSubmit={formProps.handleSubmit(onSubmit)}>
          <BookFormInput name="title" label="Title" />
          <BookFormInput name="author" label="Author" />
          <BookFormSubmit />
        </form>
      </Paper>
    </BookFormProvider>
  );
};

export default BookForm;
