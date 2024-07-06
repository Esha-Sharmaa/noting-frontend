import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { NotesProvider } from "./contexts/NotesContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ChakraProvider>
        <Router>
          <AuthProvider>
            <NotesProvider>
              <App />
            </NotesProvider>
          </AuthProvider>
        </Router>
      </ChakraProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
