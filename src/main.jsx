import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { NotesProvider } from "./contexts/NotesContext.jsx";
import { LabelProvider } from "./contexts/LabelContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/LoginPage";

import NoteList from "./components/Notes/NotesList";
import ArchiveList from "./components/Archive/ArchiveList";
import TrashList from "./components/Trash/TrashList";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import HomePage from "./Pages/HomePage.jsx";
import NotFoundPage from "./components/Common/404.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFoundPage />, // Add the 404 page as the catch-all route
      },
      {
        path: "/home",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
            children: [
              {
                index: true, // Default child route for /home
                element: <NoteList />,
              },
              {
                path: "archive",
                element: <ArchiveList />,
              },
              {
                path: "trash",
                element: <TrashList />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ChakraProvider>
        <AuthProvider>
          <NotesProvider>
            <LabelProvider>
              <RouterProvider router={router}>
                <App />
              </RouterProvider>
            </LabelProvider>
          </NotesProvider>
        </AuthProvider>
      </ChakraProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
