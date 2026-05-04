import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./provider/AuthProvider";
import Routes from "./routes";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./provider/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
