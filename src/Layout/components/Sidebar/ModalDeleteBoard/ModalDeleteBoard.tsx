import ModalCustom from '@/components/UI/Modal';
import styles from './index.module.scss';
import React, { useState } from 'react';
import { Row } from 'antd';
import Button from '@/components/UI/Button/Button';
import Text from '@/components/UI/Text';
import { useRequest } from 'ahooks';
import { serviceDeleteBoard } from '../service';
import { toast } from '@/components/UI/Toast/toast';
interface Iprops {
  children: React.ReactNode;
  onRefresh?: () => void;
  data: any;
}
function ModalDeleteBoard({ children, data, onRefresh }: Iprops) {
  const [visible, setVisible] = useState<boolean>(false);

  const requestDeleteBoard = useRequest(serviceDeleteBoard, {
    manual: true,
    onSuccess: () => {
      onRefresh && onRefresh();
      toast.success('Xóa bảng thành công.');
    },
    onError: () => {
      toast.error('Xóa bảng không thành công.');
    },
  });

  const onDelete = () => {
    if (data) {
      requestDeleteBoard.run(data?._id);
    }
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom open={visible} onCancel={() => setVisible(false)} className={styles.modal}>
        <Text type='body1' color='text-primary'>
          Bạn có chắc chắn muốn xóa{' '}
          <span className='text-[16px] not-italic font-semibold leading-[22px]'>{data?.title}</span>{' '}
          này không?
        </Text>
        <Row wrap={false} align={'middle'} justify={'end'} className='mt-[24px] gap-[16px]'>
          <Button
            type='trello-negative-secondary'
            className='w-[96px] h-[36px] !p-0'
            onClick={() => setVisible(false)}
          >
            <Text type='title1-semi-bold'>Huỷ</Text>
          </Button>
          <Button
            type='trello-negative-primary'
            className='w-[96px] h-[32px] !p-0'
            disabled={requestDeleteBoard.loading}
            loading={requestDeleteBoard.loading}
            onClick={onDelete}
          >
            <Text type='title1-semi-bold'>Xoá</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalDeleteBoard;
