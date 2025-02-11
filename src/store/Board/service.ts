import { axiosInstant } from '@/apis/request';

export const serviceBoardAll = () => {
  return axiosInstant.get(`/board`);
};
