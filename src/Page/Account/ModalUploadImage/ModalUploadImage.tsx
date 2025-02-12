import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import UploadImage from '@/components/UI/UploadImage/UploadImage';
import { useImageUpload } from '@/utils/FireBase';
import { useRequest } from 'ahooks';
import { Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { serviceUpdateUser } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { useProfileInitial } from '@/store/Profile/useProfile';

interface Iprops {
  children: React.ReactNode;
  dataProfile: any;
}
function ModalUploadImage({ children, dataProfile }: Iprops) {
  const { uploadImages } = useImageUpload();
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const { run: runProfile, onRefresh } = useProfileInitial();

  useEffect(() => {
    runProfile();
  }, []);

  useEffect(() => {
    if (visible && dataProfile) {
      form.setFieldsValue({
        avatar: dataProfile?.avatar,
      });
    }
  }, [visible]);

  const requestUpdateUser = useRequest(serviceUpdateUser, {
    manual: true,
    onSuccess: (res) => {
      setVisible(false);
      onRefresh();
      toast.success('Sửa thông tin thành công');
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
    },
  });

  const onFinish = async (values: any) => {
    const file = values.avatar.file;
    let avatar = null;
    avatar = await uploadImages(file);
    if (avatar) {
      requestUpdateUser.run(dataProfile?._id, { avatar });
    }
  };
  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>
      <ModalCustom open={visible} onCancel={() => setVisible(false)} title='Thay đổi ảnh hồ sơ'>
        <div>
          <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item name='avatar' rules={[{ required: true, message: 'Ảnh là bắt buộc' }]}>
              <UploadImage />
            </Form.Item>

            <Row justify={'end'} className='gap-2'>
              <Button
                type='trello-secondary'
                className='w-[96px] h-[36px]'
                onClick={() => setVisible(false)}
              >
                hủy
              </Button>
              <Button
                type='trello-primary'
                htmlType='submit'
                className='h-[36px]'
                loading={requestUpdateUser.loading}
                disabled={requestUpdateUser.loading}
              >
                Lưu thay đổi
              </Button>
            </Row>
          </Form>
        </div>
      </ModalCustom>
    </>
  );
}

export default ModalUploadImage;
