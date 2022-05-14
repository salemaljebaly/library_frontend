import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "ltr",
  typography:{
    fontFamily :[
      'Almarai', "sans-serif"
    ].join(','),
  },
  palette: {
    primary: {
      main: "#383874",
    },
    secondary: {
      main: "#6266ea",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;