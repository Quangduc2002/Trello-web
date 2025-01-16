import React from 'react';

import { Modal } from 'antd';

import { Icon } from '@/components/UI/IconFont/Icon';

import styles from './index.module.scss';

interface IModalProps {
  className?: string;
  title?: string | React.ReactNode;
  children: any;
  open: boolean;
  onCancel?: () => void;
  onArrowClose?: () => void;
  closeIcon?: any;
  maskClosable?: boolean;
  footer?: React.ReactNode;
}

const ModalCustom = ({
  className,
  title,
  children,
  open,
  onCancel,
  onArrowClose,
  closeIcon,
  maskClosable,
  footer,
}: IModalProps) => {
  let IconVal = closeIcon || (
    <Icon icon='icon-close-line' className='text-[24px]' color='text-icon' />
  );
  if (onArrowClose) {
    IconVal = (
      <span onClick={onArrowClose}>
        {closeIcon || <Icon icon='icon-close-line' className='text-[24px]' color='text-icon' />}
      </span>
    );
  }

  return (
    <Modal
      title={title}
      footer={footer || false}
      onCancel={onCancel}
      open={open}
      className={`${styles.modal} ${className}`}
      centered
      closeIcon={IconVal}
      maskClosable={maskClosable}
    >
      <>{children}</>
    </Modal>
  );
};

export default ModalCustom;
