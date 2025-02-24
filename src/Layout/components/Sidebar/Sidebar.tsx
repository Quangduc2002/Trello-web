import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/route.constant';
import { useAtom } from 'jotai';
import { atomBoardId } from './type';
import ModalAddBoard from './ModalAddBoard/ModalAddBoard';
import { atomProfiole } from '@/store/Profile/type';
import { Row } from 'antd';
import { BoardParams } from '@/Page/BoardDetail/BoardDetail';
import ModalDeleteBoard from './ModalDeleteBoard/ModalDeleteBoard';
import { atomBoardAll } from '@/store/Board/type';

interface ISidebar {
  onRefresh: () => void;
}

function Sidebar({ onRefresh }: ISidebar) {
  const [data] = useAtom(atomBoardAll);
  const { slug } = useParams<BoardParams>();
  const [profile] = useAtom(atomProfiole);
  const [, setBoardId] = useAtom(atomBoardId);
  const navigate = useNavigate();

  const handleNavigate = (item: any) => {
    setBoardId(item?._id);
    navigate(ROUTE_PATH.BOARD_DETAIL(item?.slug));
  };

  return (
    <div className='w-[260px] min-w-[260px] border-r border-[--background-header]'>
      <div className='flex items-center gap-4 p-[12px] border-b border-[--background-header] h-[60px]'>
        <img src={profile?.avatar || ''} alt='logo' className='w-[32px] rounded-[8px]' />
        <Text type='body1' className='text-[--bs-navbar-color]'>
          {profile?.name}
        </Text>
      </div>
      <div className='py-[12px] h-[calc(100%-60px)]'>
        <div className='flex justify-between items-center px-[12px]'>
          <Text type='body1' className='text-[--bs-navbar-color] font-bold'>
            Các bảng của bạn
          </Text>
          <ModalAddBoard onRefresh={onRefresh}>
            <div className='flex items-center justify-center hover:bg-[--background-modal-hover] p-[4px] rounded-[6px] cursor-pointer'>
              <Icon icon='icon-plus' className='text-[18px] text-[--bs-navbar-color] ' />
            </div>
          </ModalAddBoard>
        </div>

        <div className='sidebar mt-2 h-[calc(100%-26px)] overflow-y-auto'>
          {data?.map((item: any) => {
            return (
              <Row
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleNavigate(item);
                }}
                key={item?._id}
                className={`flex items-center ellipsis justify-between text-[--bs-navbar-color] px-[16px] hover:bg-[--background-modal-hover] h-[32px] cursor-pointer 
                  ${slug === item?.slug && 'active'}
                  `}
              >
                <Text>{item?.title}</Text>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <ModalDeleteBoard onRefresh={onRefresh} data={item}>
                    <div className='flex items-center justify-center hover:bg-[--background-modal-hover] p-[4px] rounded-[6px] cursor-pointer'>
                      <Icon
                        icon='icon-trash'
                        className='text-[14px] text-[--bs-navbar-color] hidden'
                      />
                    </div>
                  </ModalDeleteBoard>
                </div>
              </Row>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
