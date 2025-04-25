import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "./index.css";
import AppLayout from "./layout/AppLayout.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";

store.subscribe(() => {
  console.log('Redux state changed:', store.getState());
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
