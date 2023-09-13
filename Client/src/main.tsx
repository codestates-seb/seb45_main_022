import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TitlePage from './pages/TitlePage';
import FeedPage from './pages/FeedPage';
import MapPage from './pages/MapPage';
import SearchPage from './pages/SearchPage';
import PostScreen from './components/feed/PostScreen';
import AuthPage from './pages/AuthPage';
import LoginSection from './components/auth/LoginSection';
import RegisterSection from './components/auth/RegisterSection';
import MainPage from './pages/MainPage';
import CheckInScreen from './components/main/CheckInScreen';
import ProfileScreen from './components/main/ProfileScreen';
import StatusScreen from './components/main/StatusScreen';
import PrivateRoute from './pages/PrivateRoute';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <TitlePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      {
        path: 'login',
        element: <LoginSection />,
      },
      {
        path: 'register',
        element: <RegisterSection />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/main',
        element: <MainPage />,
        children: [
          {
            path: 'checkin',
            element: <CheckInScreen />,
          },
          {
            path: 'profile',
            element: <ProfileScreen />,
          },
          {
            path: 'status',
            element: <StatusScreen />,
          },
        ],
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
      {
        path: '/feed/:categoryCodeParam/search/:searchType/:keyword',
        element: <SearchPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
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
