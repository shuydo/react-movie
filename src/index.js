import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// import ThemeProvider from "@mui/material/styles/ThemeProvider";
// import createTheme from "@mui/material/styles/createTheme";

import "../src/index.css";
import App from "./App";

// const newBPs = Object.assign(createTheme().breakpoints.values, { xxl: 1920 });
// const theme = createTheme({ breakpoints: { values: newBPs } }); // theme.palette.primary.main = "#F50057";
// console.log(theme.breakpoints.values);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
      <App />
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
