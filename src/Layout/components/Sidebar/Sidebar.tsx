import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import { useRequest } from 'ahooks';
import { serviceBoardAll } from './service';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import { useAtom } from 'jotai';
import { atomBoardId } from './type';
import ModalAddBoard from './ModalAddBoard/ModalAddBoard';

function Sidebar() {
  const { data, refresh } = useRequest(serviceBoardAll);
  const [, setBoardId] = useAtom(atomBoardId);
  const navigate = useNavigate();

  const handleNavigate = (item: any) => {
    setBoardId(item?._id);
    navigate(ROUTE_PATH.BOARD_DETAIL(item?.slug));
  };

  return (
    <div className='w-[260px] min-w-[260px] border-r border-[--background-header]'>
      <div className='flex items-center gap-4 p-[12px] border-b border-[--background-header]'>
        <img src='/Images/avt-default.jpg' alt='logo' className='w-[32px] rounded-[8px]' />
        <Text type='body1' className='text-[--bs-navbar-color]'>
          Phạm Quang Đức
        </Text>
      </div>
      <div className='py-[12px]'>
        <div className='flex justify-between items-center px-[12px]'>
          <Text type='body1' className='text-[--bs-navbar-color] font-bold'>
            Các bảng của bạn
          </Text>
          <ModalAddBoard onRefresh={refresh}>
            <div className='flex items-center justify-center hover:bg-[--background-modal-hover] p-[4px] rounded-[6px] cursor-pointer'>
              <Icon icon='icon-plus' className='text-[18px] text-[--bs-navbar-color] ' />
            </div>
          </ModalAddBoard>
        </div>

        <div className='sidebar mt-2'>
          {data?.data?.map((item: any) => {
            return (
              <NavLink
                to={ROUTE_PATH.BOARD_DETAIL(item?.slug)}
                onClick={() => handleNavigate(item)}
                key={item?._id}
                type='body2'
                className='flex items-center text-[--bs-navbar-color] px-[16px] hover:bg-[--background-modal-hover] h-[32px] cursor-pointer'
              >
                {item?.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
