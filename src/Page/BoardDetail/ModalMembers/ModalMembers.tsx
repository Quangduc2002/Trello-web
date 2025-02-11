import React from 'react';
import Text from '@/components/UI/Text';
import { Tooltip } from 'antd';

interface IProps {
  dataMembers: any;
}
function ModalMembers({ dataMembers }: IProps) {
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
        {dataMembers?.map((item: any) => {
          return (
            <Tooltip key={item?._id} title={item?.name}>
              <img
                src='/Images/avt-default.jpg'
                alt='logo'
                className='w-[34px] h-[34px] rounded-full cursor-pointer'
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

export default ModalMembers;
