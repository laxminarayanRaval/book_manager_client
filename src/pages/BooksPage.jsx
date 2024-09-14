import BookList from "../components/BookList";
import { Container, Grid, Paper } from "@mui/material";

const BooksPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <BookList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BooksPage;
