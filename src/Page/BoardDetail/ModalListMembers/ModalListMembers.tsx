import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import ModalDeleteMember from '../ModalDeleteMember/ModalDeleteMember';

interface IProps {
  data: any;
  onRefresh: () => void;
}

function ModalListMembers({ data, onRefresh }: IProps) {
  return (
    <div className='w-[304px] px-[12px]'>
      <ul className='flex flex-col mt-4'>
        {data?.members?.map((item: any) => {
          return (
            <li
              key={item?._id}
              className='flex gap-2 items-center justify-between hover:bg-[--background-modal-hover] cursor-pointer rounded-lg p-2'
            >
              <div className='flex gap-3 items-center'>
                <img
                  alt='logo'
                  src={item?.avatar}
                  className='w-[34px] h-[34px] rounded-full cursor-pointer border'
                />
                <Text type='body1' className='text-[--bs-navbar-color] line-clamp-1'>
                  {item?.name}
                </Text>
              </div>

              {item?._id !== data?.creator && (
                <ModalDeleteMember data={item} boardId={data?._id} onRefresh={onRefresh}>
                  <div className='flex hover:bg-[--background-modal-hover] p-[4px] rounded-[6px]'>
                    <Icon icon='icon-close-line' className='text-[20px] text-[--bs-navbar-color]' />
                  </div>
                </ModalDeleteMember>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ModalListMembers;
