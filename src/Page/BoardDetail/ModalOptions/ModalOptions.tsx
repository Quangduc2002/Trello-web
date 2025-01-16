import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';

interface IModalOptions {
  data: any;
  setAddContentColumn: (value: any) => void;
  onCancel: () => void;
}

function ModalOptions({ data, setAddContentColumn, onCancel }: IModalOptions) {
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
          <Text type='body1'>Add new card</Text>
        </li>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-copy'></Icon>
          <Text type='body1'>Copy</Text>
        </li>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-clip-board'></Icon>
          <Text type='body1'>Paste</Text>
        </li>
      </ul>
      <ul className='pt-[8px]'>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-trash'></Icon>
          <Text type='body1'>Delete column</Text>
        </li>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-cloud'></Icon>
          <Text type='body1'>Web Clipboard</Text>
        </li>
      </ul>
    </div>
  );
}

export default ModalOptions;
