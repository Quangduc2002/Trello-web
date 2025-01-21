import { useEffect, useState } from 'react';
import { Button, Popover } from 'antd';

import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import Container from '@/components/UI/Container/Container';
import { Input } from 'antd';
import ModalWorkSpace from '../ModalWorkSpace/ModalWorkSpace';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
function Header() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { Search } = Input;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className='relative z-10 h-[60px] bg-[--background-header]'>
      <Container className='flex justify-between h-full items-center'>
        <ul className='flex gap-8 items-center'>
          <div className='flex gap-4 items-center'>
            <Icon icon='icon-grid-3' className='text-[24px] text-white' />
            <NavLink to={ROUTE_PATH.HOME}>
              <img src='/Images/logo.gif' alt='Logo' className='h-[20px]' />
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
                  className='text-[--bs-navbar-color] flex items-center gap-2 hover:text-[--bs-navbar-hover-color] cursor-pointer'
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

          {/* <Popover trigger='click' arrow={false} placement='bottomLeft'>
            <Text
              type='body1'
              className='text-[--bs-navbar-color] flex items-center gap-2 hover:text-[--bs-navbar-hover-color] cursor-pointer'
            >
              Templates
              <Icon icon='icon-alt-arrow-down' className='text-[20px]' />
            </Text>
          </Popover> */}

          <Text
            type='body1'
            className='flex items-center gap-2 text-[--bs-navbar-color] hover:text-[--bs-navbar-hover-color] cursor-pointer'
          >
            <Icon icon='icon-square-plus' className='text-[18px] text-[--bs-navbar-color]' />
            Create
          </Text>
        </ul>
        <ul className='flex gap-4 items-center hidden-header'>
          <Search
            placeholder='Tìm kiếm'
            allowClear
            className='w-[220px] bg-[#d3cfd3] rounded-[6px] input-search'
          />
          <Icon
            onClick={toggleTheme}
            icon={`${theme === 'light' ? 'icon-icon-light' : 'icon-icon-dark'}`}
            className='text-2xl text-[--bs-navbar-color] cursor-pointer'
          />
        </ul>
      </Container>
    </div>
  );
}

export default Header;
