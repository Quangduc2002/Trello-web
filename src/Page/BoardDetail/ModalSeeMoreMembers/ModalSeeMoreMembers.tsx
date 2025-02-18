import React from 'react';
import Text from '@/components/UI/Text';
import { Tooltip } from 'antd';
import { Icon } from '@/components/UI/IconFont/Icon';

interface IProps {
  data: any;
}
function ModalSeeMoreMembers({ data }: IProps) {
  return (
    <div className='w-[300px] min-h-[100px]'>
      <Text
        element='h1'
        type='body1'
        className='mx-[10px] py-[10px] border-b border-[--bs-navbar-color] text-[--bs-navbar-color]'
      >
        Thành viên của bảng
      </Text>

      <div className='grid grid-cols-7 gap-2 mx-[10px] py-[10px]'>
        {data?.members?.map((item: any) => {
          return (
            <div className='relative' key={item?._id}>
              <Tooltip key={item?._id} title={item?.name}>
                <img
                  src={item?.avatar}
                  alt='logo'
                  className='w-[34px] h-[34px] rounded-full cursor-pointer border'
                />
              </Tooltip>
              {item?._id === data?.creator && (
                <Tooltip title={'Quản trị viên'}>
                  <div className='absolute bottom-[-2px] right-[-2px] px-[4px] bg-red-500 rounded-full cursor-pointer'>
                    <Icon icon='icon-chevrons-up' className='w-[10px] h-[10px] text-white' />
                  </div>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ModalSeeMoreMembers;
