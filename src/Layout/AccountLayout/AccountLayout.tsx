import { useProfileInitial } from '@/store/Profile/useProfile';
import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

function AccountLayout() {
  return (
    <div className='bg-[--background-body] min-h-[100vh]'>
      <Suspense fallback={undefined}>
        <Header />

        <div className='flex h-[calc(100%-60px)]'>
          <main className='w-full h-full'>
            <Outlet />
          </main>
        </div>
      </Suspense>
    </div>
  );
}

export default AccountLayout;
