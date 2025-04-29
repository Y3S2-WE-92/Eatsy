import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppLayout from "./layout/AppLayout";
import { ThemeProvider } from "./theme/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  </StrictMode>
);
