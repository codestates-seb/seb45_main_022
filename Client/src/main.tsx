import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TitlePage from './pages/TitlePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import MapPage from './pages/MapPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TitlePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/feed',
    element: <FeedPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// 타이틀 페이지
// 인증 페이지
// 프로필 페이지
// 맵 페이지
// 피드 조회 페이지
