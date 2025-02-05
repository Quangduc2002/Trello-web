import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useRequest } from 'ahooks';
import { serviceBoardAll } from '../components/Sidebar/service';
import { useProfileInitial } from '@/store/Profile/useProfile';

function MainLayout() {
  const { data, refresh } = useRequest(serviceBoardAll);
  const { run } = useProfileInitial();

  useEffect(() => {
    run();
  }, []);
  return (
    <div className='bg-[--background-body] h-[100vh]'>
      <Suspense fallback={undefined}>
        <Header onRefresh={refresh} />

        <div className='flex h-[calc(100%-60px)]'>
          <Sidebar data={data} onRefresh={refresh} />
          <main className='w-[calc(100%-260px)] h-full'>
            <Outlet />
          </main>
        </div>
      </Suspense>
    </div>
  );
}

export default MainLayout;
