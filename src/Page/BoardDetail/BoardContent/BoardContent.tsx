import Button from '@/components/UI/Button/Button';
import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Form, Tooltip } from 'antd';
import { useState } from 'react';
import InputText from '@/components/UI/InputText';
import { atomData, atomEditCard } from '../Type';
import { useAtom } from 'jotai';
import ModalaDeleteCard from '../ModalaDeleteCard/ModalaDeleteCard';
import { useRequest } from 'ahooks';
import { serviceEditCard } from '../service';
import { toast } from '@/components/UI/Toast/toast';

interface IBoardContent {
  dataCard: any;
}

function BoardContent({ dataCard }: IBoardContent) {
  const [form] = Form.useForm();
  const [editCardId, setEditCardId] = useAtom(atomEditCard);
  const [data, setData] = useAtom(atomData);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: dataCard?._id,
    data: { ...dataCard },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'pointer',
    opacity: isDragging ? 0.5 : undefined,
  };

  const { run } = useRequest(serviceEditCard, {
    manual: true,
    onSuccess: (res) => {
      if (!res?.data) return;

      const { columnId, _id: cardId, title } = res.data;
      const newBoard = { ...data };
      const updateColumn = newBoard?.columns?.find((column: any) => column?._id === columnId);
      if (updateColumn) {
        const updateCard = updateColumn.cards?.find((card: any) => card?._id === cardId);
        if (updateCard) {
          updateCard.title = title;
        }
      }

      setEditCardId(null);
      toast.success('Sửa nội dung thành công.');
    },
    onError: () => {
      toast.error('Sửa nội dung không thành công.');
    },
  });

  const handleEditCard = () => {
    setEditCardId(dataCard?._id);
    form.setFieldValue('title', dataCard?.title);
  };

  const onFinish = (values: any) => {
    if (editCardId) {
      run(editCardId, values);
    }
  };

  return (
    <div
      className='flex flex-col gap-2'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
      }}
    >
      <Form
        layout='vertical'
        form={form}
        className={`form-card ${editCardId !== dataCard?._id ? 'hidden' : 'block'}`}
        onFinish={onFinish}
      >
        <Form.Item
          name={'title'}
          rules={[{ whitespace: true, required: true, message: 'Vui lòng không để trống !' }]}
        >
          <InputText placeholder='Nhập nội dung' />
        </Form.Item>
        <div className='flex gap-2 mt-2 items-center pb-2'>
          <Form.Item dependencies={['title']}>
            {({ getFieldsValue }) => {
              const { title } = getFieldsValue();
              const disabled = !title || !title.trim();
              return (
                <Button
                  htmlType='submit'
                  type='xhotel-primary'
                  className='!px-[20px]'
                  disabled={disabled}
                >
                  <Text type='body2'>Sửa nội dung</Text>
                </Button>
              );
            }}
          </Form.Item>
          <div
            onClick={() => setEditCardId(null)}
            className='flex items-center justify-center hover:bg-[--background-modal-hover] p-2 rounded-[6px] cursor-pointer'
          >
            <Icon icon='icon-close' className='text-[18px] text-[--bs-navbar-color]' />
          </div>
        </div>
      </Form>

      <div
        className={`flex justify-between items-center gap-2 bg-[--background-modal] px-[12px] py-[8px] rounded-xl z-10 
          ${dataCard?.FE_PlaceholderCard ? 'hidden' : 'block'} 
          ${editCardId === dataCard?._id ? 'hidden' : 'block'}
          `}
      >
        <Text className='text-[--bs-navbar-color] text-[16px] line-clamp-1'>{dataCard?.title}</Text>
        <ul className='flex items-center'>
          <Tooltip title='Sửa nội dung' placement='bottom'>
            <li
              onClick={handleEditCard}
              className='flex items-center gap-2 p-3 rounded-full text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'
            >
              <Icon
                className='text-[12px] min-w-[12px] text-[--bs-navbar-color]'
                icon='icon-pen-fill'
              ></Icon>
            </li>
          </Tooltip>
          <ModalaDeleteCard data={dataCard}>
            <Tooltip title='Xóa nội dung' placement='bottom'>
              <li className='flex items-center gap-2 p-3 rounded-full text-[--bs-navbar-color] hover:bg-[--background-modal-hover] cursor-pointer'>
                <Icon
                  className='text-[12px] min-w-[12px] text-[--bs-navbar-color]'
                  icon='icon-trash'
                ></Icon>
              </li>
            </Tooltip>
          </ModalaDeleteCard>
        </ul>
      </div>
    </div>
  );
}

export default BoardContent;
