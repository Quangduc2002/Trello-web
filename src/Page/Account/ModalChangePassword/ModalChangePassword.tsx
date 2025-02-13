import React, { useState } from 'react';
import Text from '@/components/UI/Text';
import { Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import InputPassword from '@/components/UI/InputPassword';
import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { useRequest, useUpdateEffect } from 'ahooks';
import { serviceChangePassword } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { REG_PASSWORD } from '@/utils/reg';
import { TProfile } from '@/store/Profile/type';

interface Iprops {
  children: React.ReactNode;
  profile: TProfile | null;
}

function ModalChangePassword({ children, profile }: Iprops) {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [form] = useForm();
  const allValues = Form.useWatch([], form);

  useUpdateEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisabled(false);
      },
      (error) => {
        setDisabled(true);
      },
    );
  }, [allValues]);

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const requestChangePassword = useRequest(serviceChangePassword, {
    manual: true,
    onSuccess: () => {
      onCancel();
      toast.success('Cập nhật mật khẩu thành công.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onFinish = (values: any) => {
    if (profile) {
      requestChangePassword.run(profile._id, values);
    }
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>
      <ModalCustom open={visible} onCancel={onCancel} title='Thay đổi mật khẩu'>
        <div>
          <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item
              label={<Text type='body1'>Mật khẩu hiện tại</Text>}
              name={'passwordCurent'}
              rules={[
                { required: true, message: 'Mật khẩu hiện tại là bắt buộc' },
                {
                  pattern: REG_PASSWORD,
                  message:
                    'Mật khẩu phải có ít nhất 8 ký tự không dấu gồm chữ cái in hoa, chữ cái thường, số và ký tự đặc biệt',
                },
              ]}
            >
              <InputPassword placeholder='Nhập mật khẩu hiện tại' />
            </Form.Item>

            <Form.Item
              label={<Text type='body1'>Mật khẩu mới</Text>}
              name={'passwordNew'}
              rules={[
                { required: true, message: 'Mật khẩu mới là bắt buộc' },
                {
                  pattern: REG_PASSWORD,
                  message:
                    'Mật khẩu phải có ít nhất 8 ký tự không dấu gồm chữ cái in hoa, chữ cái thường, số và ký tự đặc biệt',
                },
              ]}
            >
              <InputPassword placeholder='Nhập mật khẩu mới' />
            </Form.Item>

            <Form.Item dependencies={['passwordCurent', 'passwordNew']}>
              {({ getFieldsValue }) => {
                const { passwordCurent, passwordNew } = getFieldsValue();
                const disabledEmpty =
                  !passwordCurent || !passwordCurent.trim() || !passwordNew || !passwordNew.trim();

                return (
                  <Row justify={'end'}>
                    <Button
                      type='trello-primary'
                      htmlType='submit'
                      disabled={disabled || disabledEmpty || requestChangePassword.loading}
                      loading={requestChangePassword.loading}
                    >
                      Lưu thay đổi
                    </Button>
                  </Row>
                );
              }}
            </Form.Item>
          </Form>
        </div>
      </ModalCustom>
    </>
  );
}

export default ModalChangePassword;
