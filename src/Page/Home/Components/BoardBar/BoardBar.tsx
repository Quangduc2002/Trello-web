import Button from '@/components/UI/Button/Button';
import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import BoardContent from '../BoardContent/BoardContent';
import { Popover } from 'antd';
import { useState } from 'react';
import InputText from '@/components/UI/InputText';
import ModalOptions from '../ModalOptions/ModalOptions';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IBoardBar {
  data: any;
  setAddContentColumn: (value: any) => void;
  addContentColumn?: any;
}

function BoardBar({ data, setAddContentColumn, addContentColumn }: IBoardBar) {
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: data._id,
    data: { ...data },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'pointer',
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      className='flex flex-col gap-4 p-[8px] mx-[8px] w-[300px] min-w-[300px] bg-[--background-header] rounded-xl max-h-full h-max'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
      }}
    >
      <div className='flex items-center justify-between text-[--bs-navbar-color] px-4'>
        <Text type='body2' className='font-bold'>
          {data?.title}
        </Text>
        <Popover
          trigger='click'
          arrow={false}
          placement='bottomLeft'
          content={
            <ModalOptions
              data={data}
              setAddContentColumn={setAddContentColumn}
              onCancel={onCancel}
            />
          }
          rootClassName='workspace'
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div className='flex items-center justify-center hover:bg-[--background-modal-hover] p-2 rounded-[6px] cursor-pointer'>
            <Icon
              icon='icon-alt-arrow-down'
              className='text-[18px] text-[--bs-navbar-color] cursor-pointer'
            />
          </div>
        </Popover>
      </div>

      <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-hidden'>
        <SortableContext
          items={data?.cards?.map((item: any) => item._id)}
          strategy={verticalListSortingStrategy}
        >
          {data?.cards?.map((item: any) => (
            <BoardContent key={item?._id} dataCard={item} />
          ))}
        </SortableContext>

        {addContentColumn === data?._id && <InputText placeholder='Nhập tiêu đề' />}
      </div>

      {addContentColumn !== data?._id ? (
        <div
          onClick={() => setAddContentColumn(data?._id)}
          className='flex gap-2 items-center text-[--brand-social] cursor-pointer hover:bg-[--background-modal-hover] py-2 px-4 rounded-[4px]'
        >
          <div>
            <Icon icon='icon-plus' className='text-[18px] !text-[--brand-social]' />
          </div>
          <Text type='body1'>Thêm thẻ</Text>
        </div>
      ) : (
        <div className='flex gap-2 items-center pb-2'>
          <Button type='xhotel-primary' className='!px-[20px]'>
            <Text type='body2'>Thêm thẻ</Text>
          </Button>
          <div
            onClick={() => setAddContentColumn(null)}
            className='flex items-center justify-center hover:bg-[--background-modal-hover] p-2 rounded-[6px] cursor-pointer'
          >
            <Icon icon='icon-close' className='text-[18px] text-[--bs-navbar-color] ' />
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardBar;
