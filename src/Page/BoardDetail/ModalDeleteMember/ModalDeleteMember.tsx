import { Row } from 'antd';
import React, { useState } from 'react';
import Button from '@/components/UI/Button/Button';
import ModalCustom from '@/components/UI/Modal';
import Text from '@/components/UI/Text';
import styles from './index.module.scss';
import { useRequest } from 'ahooks';
import { serviceRemoveMember } from '../service';
import { toast } from '@/components/UI/Toast/toast';

interface Iprops {
  children: React.ReactNode;
  data: any;
  boardId: string;
  onRefresh: () => void;
}
function ModalDeleteMember({ children, data, boardId, onRefresh }: Iprops) {
  const [visible, setVisible] = useState(false);

  const requestRemoveMember = useRequest(serviceRemoveMember, {
    manual: true,
    onSuccess: () => {
      onRefresh && onRefresh();
      setVisible(false);
      toast.success('Xóa thành viên thành công.');
    },
  });

  const onDelete = () => {
    if (data) {
      requestRemoveMember.run({
        boardId: boardId,
        memberId: data?._id,
      });
    }
  };

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <ModalCustom
        open={visible}
        onCancel={() => setVisible(false)}
        className={styles.modal}
        title='Xóa thành viên'
      >
        <Text type='body1' color='text-primary'>
          Bạn có chắc chắn muốn xóa thành viên{' '}
          <span className='text-[16px] not-italic font-semibold leading-[22px]'>{data?.name}</span>{' '}
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
            disabled={requestRemoveMember.loading}
            loading={requestRemoveMember.loading}
            onClick={onDelete}
          >
            <Text type='title1-semi-bold'>Xoá</Text>
          </Button>
        </Row>
      </ModalCustom>
    </>
  );
}

export default ModalDeleteMember;
