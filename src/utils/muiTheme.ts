import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // Use existing space / prevents shifting content below field
          marginTop: 0,
          height: 0,
        },
      },
    },
  },
});