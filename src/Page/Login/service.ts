import { axiosInstant } from '@/apis/request';

export const serviceLogin = (data: any) => {
  return axiosInstant.post(`/auth/login`, data);
};

export const serviceRegister = (data: any) => {
  return axiosInstant.post(`/user/`, data);
};
