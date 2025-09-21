import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./style/global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Providers from "./context/Providers.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Providers>
  </StrictMode>
);
