import { Upload } from 'antd';
import classNames from 'classnames';
import Text from '@/components/UI/Text';
import { base64ToBlob, beforeUploadImg, checkMb, getBase64, isImage } from '@/utils/image';
import styles from './index.module.scss';
import { Icon } from '../IconFont/Icon';
import Button from '../Button/Button';

interface IPropsFormUploadImage {
  value?: any;
  onChange?: any;
  className?: string;
  description?: string;
  multiple?: boolean;
  width?: number;
  height?: number;
  max?: number;
  objectFit?: 'contain' | 'cover' | 'fill';
}

function UploadImage({
  value,
  onChange,
  className = '',
  description,
  multiple,
  width = 410,
  height = 222,
  max,
  objectFit = 'fill',
}: IPropsFormUploadImage) {
  const onChangeFile = async (file: any) => {
    const isValidMb = checkMb(file?.file);
    if (!isImage(file?.file)) {
      return;
    }

    if (!isValidMb) {
      return;
    }

    const base64 = await getBase64(file?.file?.originFileObj);
    const url = base64ToBlob(base64, file?.file?.type);

    onChange &&
      onChange({
        file: file?.file?.originFileObj,
        url,
      });
  };

  return (
    <div>
      <div className='flex flex-col items-center'>
        {!value?.url && !value ? (
          <div className='flex items-center justify-center w-[200px] h-[200px] border-dashed border-[3px] rounded-full'>
            <img src='Images/upload.png' alt='' className={'w-[150px]'} />
          </div>
        ) : (
          <img
            src={value?.url ? value?.url : value}
            alt=''
            className={'w-[150px] h-[150px] rounded-full object-cover border-2'}
          />
        )}
        <Upload
          accept='.png, .jpg, .jpeg'
          fileList={[]}
          customRequest={() => void 0}
          onChange={onChangeFile}
          beforeUpload={beforeUploadImg}
          className={classNames(styles.upload, { [className]: !!className })}
        >
          <div className='flex items-center gap-2 h-[36px] cursor-pointer mt-4 px-[10px] bg-[#01050c17] hover:bg-[#01050c26] rounded-lg'>
            <Icon icon='icon-upload' className='text-[20px]' />
            <Text> Tải lên một bức ảnh</Text>
          </div>
        </Upload>
      </div>
    </div>
  );
}

export default UploadImage;
