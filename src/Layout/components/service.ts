import { axiosInstant } from '@/apis/request';

export const serviceLogout = () => {
  return axiosInstant.get(`/auth/logout`);
};

export const serviceNotification = () => {
  return axiosInstant.get(`/invitation`);
};

export const serviceAcceptNotification = (data: any) => {
  return axiosInstant.put(`/board/accept`, data);
};

export const serviceDeleteNotification = (id: string) => {
  return axiosInstant.delete(`/invitation/${id}`);
};
