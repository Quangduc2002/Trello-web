import Button from '@/components/UI/Button/Button';
import InputText from '@/components/UI/InputText';
import Text from '@/components/UI/Text';
import { REG_EMAIL, REG_PASSWORD } from '@/utils/reg';
import { useRequest } from 'ahooks';
import { Col, Form, Row } from 'antd';
import clsx from 'clsx';
import { serviceRegister } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { ROUTE_PATH } from '@/routes/route.constant';
import { Link } from 'react-router-dom';
import InputPassword from '@/components/UI/InputPassword';
interface IFormRegister {
  handleToggle: (value: string) => void;
}
function FormRegister({ handleToggle }: IFormRegister) {
  const [form] = Form.useForm();
  const { run: runRegister } = useRequest(serviceRegister, {
    manual: true,
    onSuccess: (res) => {
      toast.success('Đăng kí thành công.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onFinish = (values: any) => {
    runRegister(values);
  };
  return (
    <div className={clsx('w-[400px] bg-white p-8 rounded-2xl')}>
      <div>
        <div className='flex justify-between items-center mb-2'>
          <Text className='text-[18px] font-bold'>Đăng kí</Text>
          <Text onClick={() => handleToggle('login')} className='text-[16px] cursor-pointer'>
            Đăng nhập
          </Text>
        </div>

        <Form layout='vertical' onFinish={onFinish} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name='name'
                className='!my-2'
                rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}
              >
                <InputText placeholder='Nhập họ và tên' />
              </Form.Item>
            </Col>
          </Row>

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
                rules={[
                  { required: true, message: 'password là bắt buộc' },
                  {
                    pattern: REG_PASSWORD,
                    message:
                      'Mật khẩu phải có ít nhất 8 ký tự không dấu gồm chữ cái in hoa, chữ cái thường, số và ký tự đặc biệt',
                  },
                ]}
              >
                <InputPassword placeholder='Nhập password' />
              </Form.Item>
            </Col>
          </Row>

          <div className='flex justify-end gap-2 mt-2'>
            <Button htmlType='submit' type='xhotel-primary'>
              ĐĂNG KÍ
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

export default FormRegister;
