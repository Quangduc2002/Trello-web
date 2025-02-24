/* eslint-disable unicorn/no-nested-ternary */
import { useState } from 'react';

import { useRequest } from 'ahooks';
import { Form, Row } from 'antd';
import { useAtom } from 'jotai';
import Button from '@/components/UI/Button/Button';
import FormEditor from '@/components/UI/FormEditor/FormEditor';
import ModalCustom from '@/components/UI/Modal';
import Text from '@/components/UI/Text';
import { toast } from '@/components/UI/Toast/toast';

import { serviceEditCard } from '../../service';
import { atomData, atomDisable, atomEditCard } from '../../Type';
import { Icon } from '@/components/UI/IconFont/Icon';

interface IProps {
  children: React.ReactNode;
  data: any;
}
function ModalDescription({ children, data }: IProps) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [, setDisabled] = useAtom(atomDisable);
  const [, setEditCardId] = useAtom(atomEditCard);
  const [dataBoard, setDataBoard] = useAtom(atomData);

  const { run, loading } = useRequest(serviceEditCard, {
    manual: true,
    onSuccess: (res) => {
      const { columnId, _id: cardId, description } = res.data;
      const newBoard = { ...dataBoard };
      const columnUpdate = newBoard?.columns?.find((column: any) => column?._id === columnId);
      if (columnUpdate) {
        const cardUpdate = columnUpdate.cards?.find((card: any) => card?._id === cardId);
        if (cardUpdate) {
          cardUpdate.description = description;
        }
      }

      setDataBoard(newBoard);
      onCancel();
      toast.success('Cập nhật mô tả thành công.');
    },
    onError: () => {
      toast.error('Cập nhật mô tả không thành công.');
    },
  });

  const onCancel = () => {
    setVisible(false);
    setShowEdit(false);
    setDisabled(false);
  };

  const onOpen = () => {
    setVisible(true);
    setDisabled(true);
    setEditCardId(null);
  };

  const onFinish = (values: any) => {
    if (data) {
      run(data?._id, values);
    }
  };

  const handleEditDescription = () => {
    setShowEdit(true);
    form.setFieldValue('description', data?.description);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <ModalCustom
        className='!max-w-[800px] modal-description'
        open={visible}
        onCancel={onCancel}
        title={data?.title}
        // title={
        //   <div>
        //     <div className='ant-modal-title' id=':rl:'>
        //       {data?.title}
        //     </div>
        //     <div>
        //       <Text element='span' type='body1'>
        //         trong danh sách{' '}
        //       </Text>{' '}
        //       <Text element='span' type='body1' className='font-bold'>
        //         {dataBoard?.columns?.find((item: any) => item?._id === data?.columnId)?.title}
        //       </Text>
        //     </div>
        //   </div>
        // }
      >
        <div className='flex gap-3 items-center'>
          <Icon icon='icon-description' className='text-[24px] text-[#44546f]' />
          <Row align={'middle'} className='w-full' justify={'space-between'}>
            <Text className='font-bold text-[18px]'>Mô tả</Text>
            {!showEdit && data?.description && (
              <Button type='trello-primary' onClick={handleEditDescription}>
                Chỉnh sửa
              </Button>
            )}
          </Row>
        </div>

        {showEdit ? (
          <Form layout='vertical' form={form} onFinish={onFinish} className='mt-4'>
            <Form.Item className='description' name={'description'}>
              {<FormEditor />}
            </Form.Item>

            <Form.Item noStyle dependencies={['description']}>
              {({ getFieldsValue }) => {
                const { description } = getFieldsValue();
                const disabled = !description || !description.trim();

                return (
                  <Row
                    wrap={false}
                    align={'middle'}
                    justify={'end'}
                    className='mt-[24px] gap-[16px]'
                  >
                    <Button
                      type='trello-secondary'
                      className='w-[96px] h-[36px] !p-0'
                      onClick={() => setShowEdit(false)}
                    >
                      <Text type='title1-semi-bold'>Huỷ</Text>
                    </Button>
                    <Button
                      htmlType='submit'
                      type='trello-primary'
                      className='w-[96px] h-[32px] !p-0'
                      disabled={loading || disabled}
                      loading={loading}
                    >
                      <Text type='title1-semi-bold'>Lưu</Text>
                    </Button>
                  </Row>
                );
              }}
            </Form.Item>
          </Form>
        ) : data?.description ? (
          <div
            dangerouslySetInnerHTML={{ __html: data?.description || '' }}
            className={'ql-editor'}
          ></div>
        ) : (
          <Text
            onClick={() => setShowEdit(true)}
            className='bg-[#d1d1d1e6] hover:bg-[#22222226] p-4 cursor-pointer rounded-[8px] mt-4'
          >
            Thêm mô tả chi tiết hơn...
          </Text>
        )}
      </ModalCustom>
    </>
  );
}

export default ModalDescription;
