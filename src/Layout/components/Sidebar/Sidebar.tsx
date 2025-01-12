import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';

function Sidebar() {
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
          <div className='flex items-center justify-center hover:bg-[--background-modal-hover] p-[4px] rounded-[6px] cursor-pointer'>
            <Icon icon='icon-plus' className='text-[18px] text-[--bs-navbar-color] ' />
          </div>
        </div>

        <div>
          <Text
            type='body2'
            className='flex items-center text-[--bs-navbar-color] px-[16px] hover:bg-[--background-modal-hover] h-[32px] cursor-pointer'
          >
            Test 1
          </Text>
          <Text
            type='body2'
            className='flex items-center text-[--bs-navbar-color] px-[16px] hover:bg-[--background-modal-hover] h-[32px] cursor-pointer'
          >
            Test 2
          </Text>
          <Text
            type='body2'
            className='flex items-center text-[--bs-navbar-color] px-[16px] hover:bg-[--background-modal-hover] h-[32px] cursor-pointer'
          >
            Test 3
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
