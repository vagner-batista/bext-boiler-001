import { Button, Container, Typography, Grid } from "@mui/material";
import FormMaker from "components/form-maker";
import TextInput from "components/text-input";
import { Capitalize } from "lib/helpers";

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" element="h1" color="primary">
        Home Page
      </Typography>

      <FormMaker />
    </Container>
  );
}
