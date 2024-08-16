import React from "react";
import App from "./App";
import { ThemeProvider } from "./common/ThemeContext"; // Assurez-vous du bon chemin
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
