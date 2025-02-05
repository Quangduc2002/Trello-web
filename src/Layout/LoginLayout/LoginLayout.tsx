import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';

function LoginLayout() {
  return (
    <Suspense fallback={undefined}>
      <main className={clsx(styles.bg, 'h-[100vh] flex justify-center items-center')}>
        <Outlet />
      </main>
    </Suspense>
  );
}

export default LoginLayout;
