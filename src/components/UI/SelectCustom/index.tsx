/* eslint-disable multiline-ternary */
import { Empty, Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import classNames from 'classnames';

import styles from './index.module.scss';
import { Icon } from '../IconFont/Icon';
import Text from '../Text';

interface ISelectProps extends SelectProps {
  className?: string;
  label?: string;
  require?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  onSearch?: any;
}
const SelectCustom = (props: ISelectProps) => {
  const { className = '', loading, onSearch } = props;

  const onDropdownVisibleChange = () => {
    onSearch && onSearch('');
  };

  return (
    <>
      <Select
        {...props}
        onDropdownVisibleChange={onDropdownVisibleChange}
        className={classNames(styles.select, {
          [className]: !!className,
        })}
        suffixIcon={
          <Icon icon='icon-alt-arrow-down' color='text-secondary' className='text-[24px]' />
        }
        notFoundContent={
          loading ? (
            <div className={styles.loadingDiv}>
              <Spin />
              <Text type='body1' color='text-secondary'>
                Đang tải dữ liệu
              </Text>
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Text type='body1' color='text-secondary'>
                  Chưa có thông tin
                </Text>
              }
            />
          )
        }
      />
    </>
  );
};
export default SelectCustom;
