import Button from '@/components/UI/Button/Button';
import InputText from '@/components/UI/InputText';
import ModalCustom from '@/components/UI/Modal';
import { Form, Row } from 'antd';
import React, { useState } from 'react';
import Text from '@/components/UI/Text';
import { useRequest, useUpdateEffect } from 'ahooks';
import { serviceInvationMember } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { REG_EMAIL } from '@/utils/reg';
import { useAtom } from 'jotai';
import { atomData } from '../Type';

interface Iprops {
  children: React.ReactNode;
}

function ModalInvitation({ children }: Iprops) {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [form] = Form.useForm();
  const allValues = Form.useWatch([], form);
  const [data] = useAtom(atomData);

  useUpdateEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      (error) => {
        if (error?.errorFields?.length > 0) {
          setDisabled(true);
        }
      },
    );
  }, [allValues]);

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const requestInvation = useRequest(serviceInvationMember, {
    manual: true,
    onSuccess: () => {
      toast.success('Gửi lời mời thành công.');
      setVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const onFinish = (values: any) => {
    if (data) {
      requestInvation.run(data?._id, values);
    }
  };
  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom open={visible} onCancel={() => onCancel()} title='Thêm thành viên'>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <Form.Item
            label='Email người dùng'
            name='email'
            rules={[
              { required: true, message: 'Email là bắt buộc.' },
              { pattern: REG_EMAIL, message: 'Email không đúng định dạng.' },
            ]}
          >
            <InputText placeholder='Vui lòng nhập email của thành viên muốn thêm' />
          </Form.Item>

          <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
            <Button
              type='trello-secondary'
              className='w-[96px] h-[36px] !p-0'
              onClick={() => setVisible(false)}
            >
              <Text type='title1-semi-bold'>Huỷ</Text>
            </Button>
            <Button
              htmlType='submit'
              type='trello-primary'
              className='w-[96px] h-[32px] !p-0'
              disabled={disabled}
              loading={requestInvation.loading}
            >
              <Text type='title1-semi-bold'>Xác nhận</Text>
            </Button>
          </Row>
        </Form>
      </ModalCustom>
    </>
  );
}

export default ModalInvitation;
