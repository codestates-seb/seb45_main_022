import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
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
import ProfileScreen from './components/main/ProfileScreen';
import StatusScreen from './components/main/StatusScreen';
import PrivateRoute from './pages/PrivateRoute';
import FeedDetailModal from './components/feed-detail/FeedDetailModal';
import CheckInPage from './pages/CheckInPage';
import OtherUserProfileScreen from './components/main/OtherUserProfileScreen';
import NotFoundPage from './pages/NotFoundPage';
import { isAxiosError } from 'axios';
import { ERROR_MSG, ErrorType } from './api/error';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (query.meta?.hideToast) return;
      if (isAxiosError<ErrorType>(err) && err.response) {
        const { errorCode } = err.response.data;
        if (ERROR_MSG[errorCode]) {
          // console.log(ERROR_MSG[errorCode]);
          toast.error(<>{ERROR_MSG[errorCode]}</>);
          return;
        }
      }
      // console.log(query.meta?.errorMessage || 'Failed to request');
      toast.error(<>{query.meta?.errorMessage || 'Failed to request'}</>);
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, v, c, mutation) => {
      if (mutation.meta?.hideToast) return;
      console.log(data, v, c);
      toast.success(
        <>{mutation.meta?.successMessage || 'Successfully requested'}</>,
      );
    },
    onError: (err, v, c, mutation) => {
      if (mutation.meta?.hideToast) return;
      console.log(v, c);
      if (isAxiosError<ErrorType>(err) && err.response) {
        const { errorCode } = err.response.data;
        if (ERROR_MSG[errorCode]) {
          // console.log(ERROR_MSG[errorCode]);
          toast.error(<>{ERROR_MSG[errorCode]}</>);
          return;
        }
      }
      // console.log(mutation.meta?.errorMessage || 'Failed to request');
      toast.error(<>{mutation.meta?.errorMessage || 'Failed to request'}</>);
    },
  }),
});

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
        path: 'checkin',
        element: <CheckInPage />,
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
            path: 'profile',
            element: <ProfileScreen />,
          },
          {
            path: 'profile/:nickname',
            element: <OtherUserProfileScreen />,
          },
          {
            path: 'status',
            element: <StatusScreen />,
          },
          {
            path: 'post',
            element: <PostScreen />,
          },
          {
            path: 'detail/:feedIdParam',
            element: <FeedDetailModal />,
          },
        ],
      },
      {
        path: '/feed/:categoryCodeParam/search/:searchType/:keyword',
        element: <SearchPage />,
        children: [
          {
            path: 'profile/:nickname',
            element: <OtherUserProfileScreen />,
          },
          {
            path: 'detail/:feedIdParam',
            element: <FeedDetailModal isFromSearchResult />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={1500} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
