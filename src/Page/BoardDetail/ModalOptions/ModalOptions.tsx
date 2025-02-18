import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import ModalDeleteColumn from '../ModalDeleteColumn/ModalDeleteColumn';
import { useAtom } from 'jotai';
import { atomProfiole } from '@/store/Profile/type';

interface IModalOptions {
  data: any;
  setAddContentColumn: (value: any) => void;
  onCancel: () => void;
  creator: string;
}

function ModalOptions({ data, setAddContentColumn, onCancel, creator }: IModalOptions) {
  const [profile] = useAtom(atomProfiole);
  const handleAddColumn = () => {
    setAddContentColumn(data?._id);
    onCancel();
  };

  return (
    <div>
      <ul className='border-b border-[--bs-navbar-color] pb-[8px]'>
        <li
          onClick={handleAddColumn}
          className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'
        >
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-square-plus'></Icon>
          <Text type='body1'>Thêm thẻ</Text>
        </li>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-copy'></Icon>
          <Text type='body1'>Sao chép</Text>
        </li>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-clip-board'></Icon>
          <Text type='body1'>Paste</Text>
        </li>
      </ul>
      <ul className='pt-[8px]'>
        {profile?._id === creator && (
          <ModalDeleteColumn data={data}>
            <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
              <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-trash'></Icon>
              <Text type='body1'>Xóa column</Text>
            </li>
          </ModalDeleteColumn>
        )}
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-cloud'></Icon>
          <Text type='body1'>Web Clipboard</Text>
        </li>
      </ul>
    </div>
  );
}

export default ModalOptions;
