import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATH } from './route.constant';
import AppLayout from '@/Layout/AppLayout/AppLayout';
import Home from '@/Page/Home/Home';

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
    ],
  },
]);
