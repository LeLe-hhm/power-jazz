import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { routes } from './routes';
import { processRoutes } from './utils';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      ...processRoutes(routes),
    ],
  },
], {
  future: {
    v7_startTransition: true,
  },
});

export default router; 