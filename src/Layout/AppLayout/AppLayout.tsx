import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

function AppLayout() {
  return (
    <div className='bg-[--background-body] h-[100vh]'>
      <Suspense fallback={undefined}>
        <Header />

        <div className='flex h-[calc(100%-60px)]'>
          <Sidebar />
          <main className='w-[calc(100%-260px)] h-full'>
            <Outlet />
          </main>
        </div>
      </Suspense>
    </div>
  );
}

export default AppLayout;
