import { ThemeOptions, experimental_sx as sx } from "@mui/material/styles";

const theme: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: "100%",
        },
        html: {
          height: "100%",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "elevation",
      },
      styleOverrides: {
        root: sx({
          padding: 3,
        }),
      },
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#0052CC",
    },
    background: {
      default: "#EBECF0",
    },
  },
};

export default theme;
