import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TitlePage from './pages/TitlePage';
import FeedPage from './pages/FeedPage';
import MapPage from './pages/MapPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TitlePage />,
  },
  {
    path: '/map/:statusCode',
    element: <MapPage />,
  },
  {
    path: '/feed/:categoryCode',
    element: <FeedPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
