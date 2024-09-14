import { Button } from "@mui/material";
import { useBookForm } from "./BookFormContext";

const BookFormSubmit = () => {
  const { isSubmitting } = useBookForm();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={isSubmitting}
      sx={{ mt: 2 }}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default BookFormSubmit;
