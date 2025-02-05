import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from './route.constant';
import MainLayout from '@/Layout/MainLayout/MainLayout';
import Home from '@/Page/Home/Home';
import LoginLayout from '@/Layout/LoginLayout/LoginLayout';
import Login from '@/Page/Login';
import AppLayout from '@/Layout/AppLayout/AppLayout';
const BoardDetail = React.lazy(() => import('@/Page/BoardDetail/BoardDetail'));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: ROUTE_PATH.HOME,
            element: (
              <Suspense fallback={undefined}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.HOME,
            element: (
              <Suspense fallback={undefined}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.BOARD_DETAIL(':slug'),
            element: (
              <Suspense fallback={undefined}>
                <BoardDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/login',
        element: <LoginLayout />,
        children: [
          {
            path: ROUTE_PATH.LOGIN,
            element: (
              <Suspense fallback={undefined}>
                <Login />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
