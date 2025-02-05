import { axiosInstant } from '@/apis/request';

export const serviceGetProfile = () => {
  return axiosInstant.get(`/user`);
};
