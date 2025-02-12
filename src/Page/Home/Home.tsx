import { Tooltip } from 'antd';
import { useAtom } from 'jotai';
import { NavLink } from 'react-router-dom';
import Container from '@/components/UI/Container/Container';
import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import { ROUTE_PATH } from '@/routes/route.constant';
import { atomBoardAll } from '@/store/Board/type';
import Seo from '@/components/UI/Seo/Seo';

function Home() {
  const [data] = useAtom(atomBoardAll);

  return (
    <>
      <Seo titlePage={'Trello'} />
      <Container className='grid grid-cols-4 gap-3'>
        {data?.map((item: any) => {
          return (
            <NavLink
              to={ROUTE_PATH.BOARD_DETAIL(item?.slug)}
              key={item?._id}
              className='flex flex-col justify-between cursor-pointer h-[100px] bg-[--background-header] hover:bg-[--background-modal-hover] p-[8px] rounded-lg'
            >
              <Text className='text-[--bs-navbar-color]' type='body1'>
                {item?.title}
              </Text>
              <Tooltip
                placement='bottom'
                title={
                  item?.type === 'public'
                    ? 'Bất kỳ ai trên mạng internet đều có thể xem bảng này. Chỉ các thành vieecn bảng mới có quyền sửa.'
                    : 'Tất cả các thành viên của không gian làm việc có thể xem và sửa bảng này.'
                }
              >
                <Icon
                  icon={item?.type === 'public' ? 'icon-public' : 'icon-private'}
                  className='text-[--bs-navbar-color] text-[24px]'
                />
              </Tooltip>
            </NavLink>
          );
        })}
      </Container>
    </>
  );
}

export default Home;
