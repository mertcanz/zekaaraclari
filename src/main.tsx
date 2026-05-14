import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { NotificationProvider } from "./context/NotificationContext";
import AppRouter from "./AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <DataProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </DataProvider>
    </ThemeProvider>
  </StrictMode>
);
