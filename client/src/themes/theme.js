import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
      },
    },
  },
  spacing: 4,
  textColor: "#000000",
  disabledColor: "#9CADC8",
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
  },
});
