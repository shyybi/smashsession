import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './common/ThemeContext'; // Assurez-vous du bon chemin
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);