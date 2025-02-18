import { useEffect, useState } from 'react';
import { Button, Popover } from 'antd';

import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container/Container';
import { Input } from 'antd';
import ModalWorkSpace from '../ModalWorkSpace/ModalWorkSpace';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import ModalProfile from '../ModalProfile/ModalProfile';
import ModalAddBoard from '../Sidebar/ModalAddBoard/ModalAddBoard';
import ModalNotification from '../ModalNotification/ModalNotification';
import { serviceNotification } from '../service';
import { useRequest } from 'ahooks';
import { atomProfiole } from '@/store/Profile/type';
import { useAtom } from 'jotai';
interface IHeader {
  onRefresh?: () => void;
}
function Header({ onRefresh }: IHeader) {
  const [profile] = useAtom(atomProfiole);
  const { data, refresh, loading } = useRequest(serviceNotification);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [open, setOpen] = useState(false);
  const { Search } = Input;
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='relative z-10 h-[60px] bg-[--background-header]'>
      <Container className='flex justify-between h-full items-center py-0'>
        <ul className='flex gap-8 items-center'>
          <div className='flex gap-4 items-center'>
            <Icon icon='icon-grid-3' className='text-[24px] text-white' />
            <img src='/Images/logo.gif' alt='Logo' className='h-[20px]' />
          </div>

          <div className='flex gap-4 items-center sidebar'>
            <NavLink to={ROUTE_PATH.HOME} className='rounded-md'>
              <Text
                type='body1'
                className='text-[--bs-navbar-color] text flex items-center hover:text-[--bs-navbar-hover-color] cursor-pointer h-[32px] px-4'
              >
                Trang chủ
              </Text>
            </NavLink>
          </div>

          <div>
            <Popover
              trigger='click'
              arrow={false}
              placement='bottomLeft'
              content={<ModalWorkSpace />}
              // className='flex max-w-[344px] sm:w-auto items-center gap-[12px] cursor-pointer'
              rootClassName='workspace'
            >
              <div>
                <Text
                  type='body1'
                  className='text-[--bs-navbar-color] text flex items-center gap-2 hover:text-[--bs-navbar-hover-color] cursor-pointer'
                >
                  WorkSpace
                  <Icon
                    icon='icon-alt-arrow-down'
                    className='text-[20px] text-[--bs-navbar-color]'
                  />
                </Text>
              </div>
            </Popover>
          </div>

          <ModalAddBoard onRefresh={onRefresh}>
            <Text
              type='body1'
              className='flex items-center gap-2 text-[--bs-navbar-color] hover:text-[--bs-navbar-hover-color] text cursor-pointer'
            >
              <Icon icon='icon-square-plus' className='text-[18px] text-[--bs-navbar-color]' />
              Create
            </Text>
          </ModalAddBoard>
        </ul>
        <ul className='flex gap-4 items-center hidden-header'>
          {/* <Search
            placeholder='Tìm kiếm'
            allowClear
            className='w-[220px] bg-[#d3cfd3] rounded-[6px] input-search'
          /> */}

          <Popover
            trigger='click'
            arrow={false}
            placement='bottomRight'
            open={open}
            onOpenChange={handleOpenChange}
            content={
              <ModalNotification
                data={data}
                refresh={refresh}
                loading={loading}
                onRefresh={onRefresh}
                hide={hide}
              />
            }
            rootClassName='notification fixed max-h-[452px] !bottom-[16px] rounded-[16px] overflow-y-auto'
          >
            <div className='relative'>
              <Icon icon='icon-bell' className='text-2xl text-[--bs-navbar-color] cursor-pointer' />
              <Text
                type='caption1-semi-bold'
                className='absolute top-[-8px] right-[-8px] text-white bg-red-500 px-[6px] rounded-full'
              >
                {data && data?.data?.length > 0 ? data?.data?.length : 0}
              </Text>
            </div>
          </Popover>

          <Icon
            onClick={toggleTheme}
            icon={`${theme === 'light' ? 'icon-icon-light' : 'icon-icon-dark'}`}
            className='text-2xl text-[--bs-navbar-color] cursor-pointer'
          />

          <Popover
            trigger='click'
            arrow={false}
            placement='bottomLeft'
            content={<ModalProfile />}
            rootClassName='workspace'
          >
            <div>
              <img
                src={profile?.avatar}
                alt='logo'
                className='w-[32px] h-[32px] rounded-full cursor-pointer'
              />
            </div>
          </Popover>
        </ul>
      </Container>
    </div>
  );
}

export default Header;
