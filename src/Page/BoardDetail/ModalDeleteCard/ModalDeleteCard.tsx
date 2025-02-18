import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import { Row } from 'antd';
import React, { useState } from 'react';
import Text from '@/components/UI/Text';
import styles from './index.module.scss';
import { useRequest } from 'ahooks';
import { serviceDeleteCard } from '../service';
import { toast } from '@/components/UI/Toast/toast';
import { atomData } from '../Type';
import { useAtom } from 'jotai';

interface Iprops {
  children: React.ReactNode;
  data: any;
}
function ModalDeleteCard({ children, data }: Iprops) {
  const [visible, setVisible] = useState(false);
  const [dataBoards, setDataBoards] = useAtom(atomData);

  const { run } = useRequest(serviceDeleteCard, {
    manual: true,
    onSuccess: () => {
      const newBoard = {
        ...dataBoards,
      };

      const columnUpdate = newBoard?.columns?.find((column: any) => column?._id === data?.columnId);
      columnUpdate.cards = columnUpdate?.cards?.filter((card: any) => card?._id !== data?._id);
      columnUpdate.cardOrderIds = columnUpdate?.cardOrderIds?.filter(
        (card: any) => card?._id !== data?._id,
      );

      setDataBoards(newBoard);
      setVisible(false);
      toast.success('Xóa nội dung thành công');
    },
    onError: () => {
      toast.error('Xóa nội dung không thành công');
    },
  });

  const onDelete = () => {
    if (data) {
      run(data?._id, { data: { columnId: data?.columnId } });
    }
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom
        open={visible}
        onCancel={() => setVisible(false)}
        className={styles.modal}
        title='Xóa nội dung'
      >
        <Text type='body1' color='text-primary'>
          Bạn có chắc chắn muốn xóa nội dung{' '}
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
            // disabled={loading}
            // loading={loading}
            onClick={onDelete}
          >
            <Text type='title1-semi-bold'>Xoá</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalDeleteCard;
