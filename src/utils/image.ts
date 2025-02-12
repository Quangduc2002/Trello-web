import { toast } from "@/components/UI/Toast/toast";
import { RcFile } from "antd/es/upload";
export const EXT_IMAGE = ['jpg', 'jpeg', 'png'];

export const checkMb = (file: any) => {
  const checkMb = file.size / 1024 / 1024 < 10;
  return checkMb;
};

export const isImage = (file: any) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split('.');

  return (
    (file.type?.includes('image') || file.type === '') &&
    EXT_IMAGE.includes(name[name?.length - 1]?.toLowerCase())
  );
};

export const beforeUploadImg = (file: RcFile) => {
  let errorMsg;
  const isValidImage = isImage(file);
  const isValidMb = checkMb(file);
  if (!isValidImage && !errorMsg) {
    errorMsg = 'Không đúng định dạng ảnh';
  }
  if (!isValidMb && !errorMsg) {
    errorMsg = 'Dung lượng file vượt quá 10MB';
  }

  errorMsg && toast.error(errorMsg);
  return isValidImage;
};

export const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const base64ToBlob = (base64: string, type: string) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type });
  return URL.createObjectURL(blob);
};