import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import { toast } from '@/components/UI/Toast/toast';
import { useRequest } from 'ahooks';
import { serviceLogout } from '../service';
import { useNavigate } from 'react-router-dom';

function ModalProfile() {
  const navigate = useNavigate();
  const handleLogout = useRequest(serviceLogout, {
    manual: true,
    onSuccess: () => {
      toast.success('Đăng xuất thành công.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    },
    onError: () => {
      toast.error('Đăng xuất không thành công.');
    },
  });
  return (
    <div>
      <ul className='border-b border-[--bs-navbar-color] pb-[8px]'>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Text type='body1'>Quản lý tài khoản</Text>
        </li>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Text type='body1'>Trợ giúp</Text>
        </li>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Text type='body1'>Cài đặt</Text>
        </li>
      </ul>
      <ul className='pt-[8px]'>
        <li
          onClick={() => handleLogout.run()}
          className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'
        >
          <Text type='body1'>Đăng Xuất</Text>
        </li>
      </ul>
    </div>
  );
}

export default ModalProfile;
