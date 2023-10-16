import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div> INDEX </div>,
    errorElement: <div>ERROR PAGE</div>,
    children: [
      { index: true, element: <div> INDEX </div>}
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
