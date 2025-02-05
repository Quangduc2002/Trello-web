import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
