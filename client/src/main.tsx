import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { UserProvider } from "./context/user.tsx";
import { CartProvider } from "./context/cart.tsx";
import { ProductProvider } from "./conts/ProductProvider.tsx";

axios.defaults.baseURL = "http://localhost:3000";
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#F9F1E7", // Custom primary color
  //   },
  //   secondary: {
  //     main: "#dc004e", // Custom secondary color
  //   },
  // },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <LoadingProvider> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <CartProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
      {/* </LoadingProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
