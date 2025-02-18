import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { Col, Row, Spin } from 'antd';
import Button from '@/components/UI/Button/Button';
import Text from '@/components/UI/Text';
import { toast } from '@/components/UI/Toast/toast';
import { serviceAcceptNotification, serviceDeleteNotification } from '../service';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.locale('vi', {
  relativeTime: {
    future: 'trong %s',
    past: '%s trước',
    s: 'vài giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
});
// Kích hoạt plugin
dayjs.extend(relativeTime);
interface IProps {
  data: any;
  loading: boolean;
  refresh: () => void;
  onRefresh?: () => void;
  hide: () => void;
}

function ModalNotification({ data, refresh, loading, onRefresh, hide }: IProps) {
  const requestAcceptNotification = useRequest(serviceAcceptNotification, {
    manual: true,
    onSuccess: () => {
      toast.success('Bạn đã xác nhận tham gia.');
      refresh();
      onRefresh && onRefresh();
      hide();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const requestDeleteNotification = useRequest(serviceDeleteNotification, {
    manual: true,
    onSuccess: () => {
      toast.success('Bạn đã từ chối tham gia.');
      refresh();
    },
    onError: () => {
      toast.error('Bạn từ chối tham gia không thành công.');
    },
  });

  const handleAccept = (values: any) => {
    requestAcceptNotification.run(values);
  };

  const handleDelete = (values: any) => {
    requestDeleteNotification.run(values._id);
  };

  return (
    <div className='w-[400px] min-h-[100px]'>
      <Text
        element='h1'
        type='heading5-medium'
        className='mx-[10px] py-[10px] border-b border-[--bs-navbar-color] text-[--bs-navbar-color]'
      >
        Thông báo
      </Text>
      <Spin spinning={loading} className='mt-[20px]'>
        {!loading && (
          <div className='flex flex-col gap-6 max-h-[400px] overflow-y-auto px-4 py-6'>
            {data && data?.data?.length > 0 ? (
              data?.data?.map((item: any) => {
                const formattedDate = dayjs(item?.createdAt).fromNow();
                return (
                  <Col key={item?._id}>
                    <div className='text-[--bs-navbar-color]'>
                      Bạn có muốn tham gia không gian làm việc{' '}
                      <Text
                        element='span'
                        type='body1'
                        className='text-[--bs-navbar-color] font-bold'
                      >
                        {item?.board?.title}
                      </Text>{' '}
                      này không ?
                    </div>

                    <Text type='body2' className='text-[#b1b1b1]'>
                      {formattedDate}
                    </Text>

                    <Row wrap={false} align={'middle'} justify={'start'} className='mt-2 gap-2'>
                      <Button
                        type='trello-primary'
                        className='w-[96px] h-[34px] !p-0'
                        loading={requestAcceptNotification?.loading}
                        onClick={() => handleAccept(item)}
                      >
                        <Text type='title1-semi-bold'>Xác nhận</Text>
                      </Button>
                      <Button
                        type='trello-negative-primary'
                        className='w-[96px] h-[34px] !p-0'
                        loading={requestDeleteNotification?.loading}
                        onClick={() => handleDelete(item)}
                      >
                        <Text type='title1-semi-bold'>Từ chối</Text>
                      </Button>
                    </Row>
                  </Col>
                );
              })
            ) : (
              <div>
                <img alt='no image' src='/Images/taco.svg' className='m-auto' />
                <Text type='body1' className='text-[--bs-navbar-color] text-center mt-4'>
                  Không có thông báo chưa đọc
                </Text>
              </div>
            )}
          </div>
        )}
      </Spin>
    </div>
  );
}

export default ModalNotification;
