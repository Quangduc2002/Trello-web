import { axiosInstant } from '@/apis/request';

export const serviceLogout = () => {
  return axiosInstant.get(`/auth/logout`);
};
