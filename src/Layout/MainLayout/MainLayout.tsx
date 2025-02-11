import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { useProfileInitial } from '@/store/Profile/useProfile';
import { useBoardAll } from '@/store/Board/useBoardAll';

function MainLayout() {
  const { run: runProfile } = useProfileInitial();
  const { run: runBoardAll, onRefresh } = useBoardAll();

  useEffect(() => {
    runProfile();
    runBoardAll();
  }, []);

  return (
    <div className='bg-[--background-body] h-[100vh]'>
      <Suspense fallback={undefined}>
        <Header onRefresh={onRefresh} />

        <div className='flex h-[calc(100%-60px)]'>
          <Sidebar onRefresh={onRefresh} />
          <main className='w-[calc(100%-260px)] h-full'>
            <Outlet />
          </main>
        </div>
      </Suspense>
    </div>
  );
}

export default MainLayout;
