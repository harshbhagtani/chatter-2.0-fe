"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#615EF0"
    },
    secondary: {
      main: "#000000"
    }
  }
});

const StyleProvider = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default StyleProvider;
