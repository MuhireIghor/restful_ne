import ReactDOM from "react-dom/client";// Importing ReactDOM from react-dom/client (specifically for createRoot usage)
import App from "./App.tsx"; // Importing the main App component from App.tsx
import "./index.css";
import { AuthProvider } from "./contexts/AuthProvider.tsx";// Importing AuthProvider context
import AppProvider from "./contexts/AppProvider.tsx";// Importing AppProvider context
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import { Notifications } from "@mantine/notifications";
import { HelmetProvider } from "react-helmet-async";
import "@mantine/dates/styles.css";
import React from "react";// Importing React library
// Rendering the React application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <HelmetProvider>
    <AuthProvider>
      <AppProvider>
        <Notifications position="top-right" autoClose={5000} />
        <App />
      </AppProvider>
    </AuthProvider>
  </HelmetProvider>
  </React.StrictMode>
);
