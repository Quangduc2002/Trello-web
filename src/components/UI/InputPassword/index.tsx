import React, { forwardRef } from 'react';

import { Input } from 'antd';
import classNames from 'classnames';

import styles from './index.module.scss';
import { Icon } from '../IconFont/Icon';

interface InputPassword {
  className?: string;
  placeholder?: string;
  suffix?: React.ReactNode | string | null;
  prefix?: React.ReactNode | string | null;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
}

const index = (props: InputPassword, ref?: any) => {
  const { className = '', placeholder = '', suffix = null, prefix = null, ...rest } = props;

  return (
    <Input.Password
      placeholder={placeholder}
      className={classNames(styles.inputPassword, {
        [className]: !!className,
      })}
      suffix={suffix}
      prefix={prefix}
      iconRender={(visible) =>
        visible ? (
          <Icon icon='icon-eye' className='text-[20px]' />
        ) : (
          <Icon icon='icon-eye-closed' className='text-[20px]' />
        )
      }
      {...rest}
    />
  );
};

export default forwardRef(index);
