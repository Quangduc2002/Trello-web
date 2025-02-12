import React, { useState } from 'react';
import Text from '@/components/UI/Text';
import { Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import InputPassword from '@/components/UI/InputPassword';
import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';

interface Iprops {
  children: React.ReactNode;
}

function ModalChangePassword({ children }: Iprops) {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>
      <ModalCustom open={visible} onCancel={() => setVisible(false)} title='Thay đổi mật khẩu'>
        <div>
          <Form layout='vertical' form={form}>
            <Form.Item
              label={<Text type='body1'>Mật khẩu hiện tại</Text>}
              name={'passwordCurent'}
              rules={[{ required: true, message: 'Mật khẩu hiện tại là bắt buộc' }]}
            >
              <InputPassword placeholder='Nhập mật khẩu hiện tại' />
            </Form.Item>

            <Form.Item
              label={<Text type='body1'>Mật khẩu mới</Text>}
              name={'passwordNew'}
              rules={[{ required: true, message: 'Mật khẩu mới là bắt buộc' }]}
            >
              <InputPassword placeholder='Nhập mật khẩu mới' />
            </Form.Item>

            <Row justify={'end'}>
              <Button type='trello-primary'>Lưu thay đổi</Button>
            </Row>
          </Form>
        </div>
      </ModalCustom>
    </>
  );
}

export default ModalChangePassword;
