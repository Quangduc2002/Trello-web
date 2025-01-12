import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';

function ModalWorkSpace() {
  return (
    <div>
      <ul className='border-b border-[--bs-navbar-color] pb-[8px]'>
        <li className='flex items-center gap-2 py-2 px-4 text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-scissors'></Icon>
          <Text type='body1'>Cut</Text>
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
          <Icon className='text-[18px] text-[--bs-navbar-color]' icon='icon-cloud'></Icon>
          <Text type='body1'>Web Clipboard</Text>
        </li>
      </ul>
    </div>
  );
}

export default ModalWorkSpace;
