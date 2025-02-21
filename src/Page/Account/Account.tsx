import Button from '@/components/UI/Button/Button';
import Container from '@/components/UI/Container/Container';
import InputText from '@/components/UI/InputText';
import Text from '@/components/UI/Text';
import { atomProfiole } from '@/store/Profile/type';
import { Form, Popover, Row } from 'antd';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import ModalChangePassword from './ModalChangePassword/ModalChangePassword';
import { Icon } from '@/components/UI/IconFont/Icon';
import { useRequest } from 'ahooks';
import { serviceUpdateUser } from './service';
import { toast } from '@/components/UI/Toast/toast';
import ModalUploadImage from './ModalUploadImage/ModalUploadImage';
import Seo from '@/components/UI/Seo/Seo';

function Account() {
  const [form] = Form.useForm();
  const [profile] = useAtom(atomProfiole);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name,
        email: profile.email,
      });
    }
  }, [profile]);

  const requestUpdateUser = useRequest(serviceUpdateUser, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Sửa thông tin thành công');
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
    },
  });

  const onFinish = (values: any) => {
    if (profile) {
      requestUpdateUser.run(profile._id, values);
    }
  };

  return (
    <>
      <Seo titlePage={'Hồ sơ cá nhân'} />
      <Container className='flex flex-col gap-6 w-[600px]'>
        <div>
          <Text type='heading4-bold' className='text-[--bs-navbar-color]'>
            Hồ sơ và chế độ hiển thị
          </Text>
          <Text type='body1' className='text-[--bs-navbar-color] my-2'>
            Quản lý thông tin cá nhân của bạn, đồng thời kiểm soát thông tin nào người khác xem được
            và ứng dụng nào có thể truy cập.
          </Text>
          <ModalChangePassword profile={profile}>
            <Text
              type='body2'
              className='inline text-[--bs-navbar-color] hover:text-[--bs-navbar-hover-color] cursor-pointer text-xl'
            >
              Đổi mật khẩu
            </Text>
          </ModalChangePassword>
        </div>

        <div className='bg-[--background-header] p-5 rounded-xl'>
          <Text type='heading4-bold' className='text-center text-[--bs-navbar-color] mb-3'>
            Ảnh hồ sơ
          </Text>
          <div className='flex justify-center'>
            <div className='relative h-[100px] w-[100px]'>
              <img
                src={profile?.avatar}
                alt='Logo'
                className='h-[100px] w-[100px] rounded-full border-2'
              />
              <ModalUploadImage dataProfile={profile}>
                <div className='absolute h-[34px] p-2 right-0 bottom-0 bg-[--background-body] hover:opacity-80 cursor-pointer rounded-full'>
                  <Icon icon='icon-camera' className='text-[20px] text-[--bs-navbar-color]' />
                </div>
              </ModalUploadImage>
            </div>
          </div>
        </div>

        <div className='bg-[--background-header] p-5 rounded-xl'>
          <Text type='heading4-bold' className='text-[--bs-navbar-color] mb-3 text-center'>
            Giới thiệu về bạn
          </Text>
          <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item
              label={
                <Text type='body1' className='text-[--bs-navbar-color]'>
                  Họ và tên
                </Text>
              }
              name={'name'}
              rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}
            >
              <InputText />
            </Form.Item>

            <Form.Item
              label={
                <Text type='body1' className='text-[--bs-navbar-color]'>
                  Email
                </Text>
              }
              name={'email'}
              rules={[{ required: true, message: 'Mật khẩu hiện tại là bắt buộc' }]}
            >
              <InputText disabled />
            </Form.Item>
            <Row justify={'end'}>
              <Button
                type='trello-primary'
                htmlType='submit'
                loading={requestUpdateUser.loading}
                disabled={requestUpdateUser.loading}
              >
                Lưu thay đổi
              </Button>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Account;
