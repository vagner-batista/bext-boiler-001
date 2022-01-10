import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { teal, pink } from "@mui/material/colors";

const pretheme = createTheme({
  palette: {
    primary: teal,
    secondary: pink,
  },
});

const theme = responsiveFontSizes(pretheme);

export default theme;
