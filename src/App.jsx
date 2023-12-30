import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AllUsers from "./pages/AllUsers";
import EditUser from "./pages/EditUser";
import AddUser from "./pages/AddUser";
import EditRequest from "./pages/EditRequest";
import AllRequests from "./pages/AllRequests";
import AddRequest from "./pages/AddRequest";
import Layout from "./components/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 Not Found</div>,
    element: <Layout></Layout>,
    children: [
      { path: "/", element: <Navigate to="/request/new" /> },
      { path: "/users", element: <AllUsers></AllUsers> },
      { path: "/user/new", element: <AddUser></AddUser> },
      { path: "/user/edit/:id", element: <EditUser></EditUser> },
      { path: "/requests", element: <AllRequests></AllRequests> },
      { path: "/request/new", element: <AddRequest></AddRequest> },
      { path: "/request/edit/:id", element: <EditRequest></EditRequest> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
