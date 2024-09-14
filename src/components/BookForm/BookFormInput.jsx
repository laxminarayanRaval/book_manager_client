import { TextField } from "@mui/material";
import { useBookForm } from "./BookFormContext";

const BookFormInput = ({ name, label }) => {
  const { values, errors, handleChange } = useBookForm();

  return (
    <TextField
      fullWidth
      margin="normal"
      name={name}
      label={label}
      value={values[name]}
      onChange={handleChange}
      error={!!errors[name]}
      helperText={errors[name]}
    />
  );
};

export default BookFormInput;
