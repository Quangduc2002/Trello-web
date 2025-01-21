import Button from '@/components/UI/Button/Button';
import { Icon } from '@/components/UI/IconFont/Icon';
import Text from '@/components/UI/Text';
import BoardContent from '../BoardContent/BoardContent';
import { Form, Popover, Tooltip } from 'antd';
import { useState } from 'react';
import InputText from '@/components/UI/InputText';
import ModalOptions from '../ModalOptions/ModalOptions';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRequest } from 'ahooks';
import { serviceAddCard } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { atomData } from '../Type';
import { useAtom } from 'jotai';

interface IBoardBar {
  dataColumn: any;
  setAddContentColumn: (value: any) => void;
  addContentColumn?: any;
}

function BoardBar({ dataColumn, setAddContentColumn, addContentColumn }: IBoardBar) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [data, setData] = useAtom(atomData);

  const { run } = useRequest(serviceAddCard, {
    manual: true,
    onSuccess: (res) => {
      const newBoard = { ...data };
      const columnUpdate = newBoard?.columns?.find(
        (column: any) => column?._id === res?.data?.columnId,
      );

      if (columnUpdate) {
        columnUpdate?.cards?.push(res?.data);
        columnUpdate?.cardOrderIds?.push(res?.data?._id);

        // khi thêm card thì xóa phần tử có card là FE_PlaceholderCard
        if (columnUpdate?.cards?.length > 1) {
          const indexToRemove = columnUpdate?.cards?.findIndex(
            (card: any) => card?.FE_PlaceholderCard,
          );
          if (indexToRemove !== -1) {
            columnUpdate?.cards?.splice(indexToRemove, 1);
          }
        }
      }

      setData(newBoard);
      form.resetFields();
      setAddContentColumn(null);
      toast.success('Thêm nội dung thành công');
    },
    onError: () => {
      toast.error('Thêm nội dung không thành công');
    },
  });

  const onCancel = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: dataColumn._id,
    data: { ...dataColumn },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'pointer',
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleAddCard = (data: any) => {
    if (data) {
      run({
        boardId: data?.boardId,
        columnId: data?._id,
        title: form?.getFieldValue('title'),
      });
    }
  };

  const hanldeCancel = () => {
    form.resetFields();
    setAddContentColumn(null);
  };

  return (
    <div
      className='overflow-auto p-[8px] mx-[8px] w-[300px] min-w-[300px] bg-[--background-header] rounded-xl max-h-full h-max min-h-[100px]'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
      }}
    >
      <div className='flex items-center justify-between text-[--bs-navbar-color] px-4 py-2'>
        <Text type='body2' className='font-bold'>
          {dataColumn?.title}
        </Text>
        <Popover
          trigger='click'
          arrow={false}
          placement='bottomRight'
          content={
            <ModalOptions
              data={dataColumn}
              setAddContentColumn={setAddContentColumn}
              onCancel={onCancel}
            />
          }
          rootClassName='workspace'
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Tooltip title='Thao tác' placement='bottom'>
            <div className='flex items-center justify-center hover:bg-[--background-modal-hover] p-2 rounded-[6px] cursor-pointer'>
              <Icon
                icon='icon-alt-arrow-down'
                className='text-[18px] text-[--bs-navbar-color] cursor-pointer'
              />
            </div>
          </Tooltip>
        </Popover>
      </div>

      {/* overflow-y-scroll */}
      <div className='flex flex-col gap-2 overflow-x-hidden'>
        {dataColumn?.cards?.length > 0 && (
          <SortableContext
            items={dataColumn?.cards?.map((item: any) => item?._id)}
            strategy={verticalListSortingStrategy}
          >
            {dataColumn?.cards?.map((item: any) => (
              <BoardContent key={item?._id} dataCard={item} />
            ))}
          </SortableContext>
        )}
      </div>

      <Form layout='vertical' form={form} className='form-card mt-2'>
        {addContentColumn !== dataColumn?._id ? (
          <div
            onClick={() => setAddContentColumn(dataColumn?._id)}
            className='text-[--brand-social] cursor-pointer pb-2'
          >
            <div className='flex gap-2 items-center py-2 px-4 hover:bg-[--background-modal-hover] rounded-[4px]'>
              <Icon icon='icon-plus' className='text-[18px] !text-[--brand-social]' />
              <Text type='body1'>Thêm thẻ</Text>
            </div>
          </div>
        ) : (
          <>
            <Form.Item
              name='title'
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
                      type='xhotel-primary'
                      className='!px-[20px]'
                      onClick={() => handleAddCard(dataColumn)}
                      disabled={disabled}
                    >
                      <Text type='body2'>Thêm thẻ</Text>
                    </Button>
                  );
                }}
              </Form.Item>
              <div
                onClick={hanldeCancel}
                className='flex items-center justify-center hover:bg-[--background-modal-hover] p-2 rounded-[6px] cursor-pointer'
              >
                <Icon icon='icon-close' className='text-[18px] text-[--bs-navbar-color]' />
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export default BoardBar;
