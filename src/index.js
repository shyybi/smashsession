import React from "react";
import App from "./App";
import { ThemeProvider } from "./common/ThemeContext"; // Assurez-vous du bon chemin
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ThemeProvider>
          <Notifications />
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </ThemeProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
