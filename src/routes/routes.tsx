import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from './route.constant';
import AppLayout from '@/Layout/AppLayout/AppLayout';
import Home from '@/Page/Home/Home';
const BoardDetail = React.lazy(() => import('@/Page/BoardDetail/BoardDetail'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
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
        path: ROUTE_PATH.BOARD_DETAIL(':slug'),
        element: (
          <Suspense fallback={undefined}>
            <BoardDetail />
          </Suspense>
        ),
      },
    ],
  },
]);
