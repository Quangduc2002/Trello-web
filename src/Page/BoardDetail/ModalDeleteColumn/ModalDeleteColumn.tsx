import ModalCustom from '@/components/UI/Modal';
import React, { useState } from 'react';
import styles from './index.module.scss';
import Text from '@/components/UI/Text';
import { Row } from 'antd';
import Button from '@/components/UI/Button/Button';
import { toast } from '@/components/UI/Toast/toast';
import { serviceDeleteColumn } from '../service';
import { useRequest } from 'ahooks';
import { atomData, IColumn } from '../Type';
import { useAtom } from 'jotai';

interface Iprops {
  children: React.ReactNode;
  data: IColumn;
}

function ModalDeleteColumn({ children, data }: Iprops) {
  const [visible, setVisible] = useState(false);
  const [dataBoards, setDataBoards] = useAtom(atomData);

  const { run: runDeleteColumn, loading } = useRequest(serviceDeleteColumn, {
    manual: true,
    onSuccess: () => {
      const newBoard = {
        ...dataBoards,
        columnOrderIds: dataBoards?.columnOrderIds?.filter(
          (columnId: any) => columnId !== data?._id,
        ),
        columns: dataBoards?.columns?.filter((column: any) => column?._id !== data?._id),
      };
      setDataBoards(newBoard);
      setVisible(false);
      toast.success('Xóa column thành công');
    },
    onError: () => {
      toast.error('Xóa column không thành công');
    },
  });

  const onDelete = () => {
    if (data) {
      runDeleteColumn(data?._id, {
        data: { boardId: data.boardId },
      });
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
            type='xhotel-negative-secondary'
            className='w-[96px] h-[36px] !p-0'
            onClick={() => setVisible(false)}
          >
            <Text type='title1-semi-bold'>Huỷ</Text>
          </Button>
          <Button
            type='xhotel-negative-primary'
            className='w-[96px] h-[32px] !p-0'
            disabled={loading}
            loading={loading}
            onClick={onDelete}
          >
            <Text type='title1-semi-bold'>Xoá</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalDeleteColumn;
