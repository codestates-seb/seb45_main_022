import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import TitlePage from './pages/TitlePage';
import FeedPage from './pages/FeedPage';
import MapPage from './pages/MapPage';
import PostScreen from './components/feed/PostScreen';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <TitlePage />,
  },
  {
    path: '/map/:statusCodeParam',
    element: <MapPage />,
  },
  {
    path: '/feed/:categoryCodeParam',
    element: <FeedPage />,
    children: [
      {
        path: 'post',
        element: <PostScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
