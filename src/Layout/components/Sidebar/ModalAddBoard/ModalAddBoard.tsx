import InputText from '@/components/UI/InputText';
import ModalCustom from '@/components/UI/Modal';
import SelectCustom from '@/components/UI/SelectCustom';
import { Form, Row } from 'antd';
import React, { useState } from 'react';
import Text from '@/components/UI/Text';
import Button from '@/components/UI/Button/Button';
import { useRequest } from 'ahooks';
import { serviceCreateBoard } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { useAtom } from 'jotai';
import { atomProfiole } from '@/store/Profile/type';

interface IModalAddBoard {
  data?: any;
  children: React.ReactNode;
  onRefresh?: () => void;
}

function ModalAddBoard({ children, onRefresh }: IModalAddBoard) {
  const [visible, setVisible] = useState(false);
  const [profile] = useAtom(atomProfiole);
  const [form] = Form.useForm();
  const optionType = [
    {
      label: (
        <div>
          <Text type='body1' className='!font-semibold'>
            Riêng tư
          </Text>

          <Text type='body2' className='!text-[--neutral-500] whitespace-normal'>
            Chỉ có thành viên bảng thông tin mới có quyền xem bảng thông tin này.Quản trị viên của
            không gian làm việc đó có thể đóng bảng thông tin hoặc xóa thành viên.
          </Text>
        </div>
      ),
      value: 'private',
      actualLabel: 'Riêng tư',
    },
    {
      label: (
        <div>
          <Text type='body1' className='!font-semibold'>
            Công khai
          </Text>

          <Text type='body2' className='!text-[--neutral-500] whitespace-normal'>
            Bất kì ai trên mạng internet đều có thể xem bảng thông tin này.Chỉ thành viên bảng thông
            tin mới có quyền sửa.
          </Text>
        </div>
      ),
      value: 'public',
      actualLabel: 'Công khai',
    },
  ];

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const { run } = useRequest(serviceCreateBoard, {
    manual: true,
    onSuccess: () => {
      setVisible(false);
      onRefresh && onRefresh();
      form.resetFields();
      toast.success('Tạo bảng thông tin thành công');
    },
    onError: () => {
      toast.success('Tạo bảng thông tin không thành công');
    },
  });
  const onFinish = (values: any) => {
    run({
      title: values.title,
      type: values.type,
      userId: profile?._id,
    });
  };
  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom open={visible} onCancel={() => onCancel()} title='Tạo bảng'>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item
            name={'title'}
            label={<Text className='font-bold'>Tiêu đề bảng</Text>}
            rules={[{ required: true, message: 'Tiêu đề là bắt buộc' }]}
          >
            <InputText placeholder='Nhập tiêu đề' />
          </Form.Item>

          <Form.Item
            name={'type'}
            label={<Text className='font-bold'>Quyền xem</Text>}
            rules={[{ required: true, message: 'Quyền xem là bắt buộc' }]}
          >
            <SelectCustom
              placeholder='Chọn quyền xem'
              options={optionType}
              optionLabelProp='actualLabel'
            />
          </Form.Item>

          <Row wrap={false} align={'middle'} justify={'end'} className='mt-[48px] gap-[16px]'>
            <Button
              type='xhotel-secondary'
              className='w-[96px] h-[36px] !p-0'
              onClick={() => onCancel()}
            >
              <Text type='title1-semi-bold'>Huỷ</Text>
            </Button>
            <Button
              htmlType='submit'
              type='xhotel-primary'
              className='w-[96px] h-[36px] !p-0'
              // disabled={loading}
              // loading={loading}
              // onClick={onDelete}
            >
              <Text type='title1-semi-bold'>Xác nhận</Text>
            </Button>
          </Row>
        </Form>
      </ModalCustom>
    </>
  );
}

export default ModalAddBoard;
