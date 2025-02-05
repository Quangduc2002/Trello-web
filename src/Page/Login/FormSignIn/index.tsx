import Button from '@/components/UI/Button/Button';
import InputText from '@/components/UI/InputText';
import Text from '@/components/UI/Text';
import { REG_EMAIL, REG_PASSWORD } from '@/utils/reg';
import { useRequest } from 'ahooks';
import { Col, Form, Row } from 'antd';
import clsx from 'clsx';
import { serviceLogin } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { ROUTE_PATH } from '@/routes/route.constant';
import { Link, useNavigate } from 'react-router-dom';
import InputPassword from '@/components/UI/InputPassword';
import { useProfileInitial } from '@/store/Profile/useProfile';

interface IFormSignIn {
  handleToggle: (value: string) => void;
}

function FormSignIn({ handleToggle }: IFormSignIn) {
  const { run } = useProfileInitial();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { run: runLogin } = useRequest(serviceLogin, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Đăng nhập thành công.');
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      navigate('/');
      run();
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  const onFinish = (values: any) => {
    runLogin(values);
  };
  return (
    <div className={clsx('w-[400px] bg-white p-8 rounded-2xl')}>
      <div>
        <div className='flex justify-between items-center mb-2'>
          <Text className='text-[18px] font-bold'>Đăng Nhập</Text>
          <Text onClick={() => handleToggle('register')} className='text-[16px] cursor-pointer'>
            Đăng Kí
          </Text>
        </div>

        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name='email'
                className='!my-2'
                rules={[
                  { required: true, message: 'Email là bắt buộc' },
                  { pattern: REG_EMAIL, message: 'Email không hợp lệ' },
                ]}
              >
                <InputText placeholder='Nhập email' />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name='password'
                className='!my-2'
                rules={[{ required: true, message: 'Mật khẩu là bắt buộc' }]}
              >
                <InputPassword placeholder='Nhập password' />
              </Form.Item>
            </Col>
          </Row>

          <div className='flex justify-end gap-2 mt-2'>
            <Button htmlType='submit' type='xhotel-primary'>
              ĐĂNG NHẬP
            </Button>

            <Link to={ROUTE_PATH.HOME}>
              <Button type='xhotel-secondary'>TRỞ LẠI</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FormSignIn;
