import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import TitlePage from './pages/TitlePage';
import FeedPage from './pages/FeedPage';
import MapPage from './pages/MapPage';

const queryClient = new QueryClient();

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
    path: '/feed',
    element: <FeedPage />,
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

// 타이틀 페이지
// 인증 페이지
// 프로필 페이지
// 맵 페이지
// 피드 조회 페이지
