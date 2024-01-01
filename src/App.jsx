

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
import AllLocations from "./pages/AllLocations";
import AllHospitals from "./pages/AllHospitals";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Layout/>,
    children: [
      { path: "/", element: <Navigate to="/requests" /> },
      { path: "/users", element: <AllUsers></AllUsers> },
      { path: "/users/new", element: <AddUser></AddUser> },
      { path: "/users/edit/:id", element: <EditUser></EditUser> },
      { path: "/requests", element: <AllRequests></AllRequests> },
      { path: "/requests/new", element: <AddRequest></AddRequest> },
      { path: "/requests/edit/:id", element: <EditRequest></EditRequest> },
      { path: "/locations", element: <AllLocations></AllLocations> },
      { path: "/hospitals", element: <AllHospitals></AllHospitals> },
      { path: "/error", element: <ErrorPage></ErrorPage> },
      { path: "*", element: <Navigate to="/error" />}
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />  
      </QueryClientProvider>
    </>
  );
}

export default App;
