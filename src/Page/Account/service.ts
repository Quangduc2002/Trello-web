import { axiosInstant } from '@/apis/request';

export const serviceUpdateUser = (id: string, data: any) => {
  return axiosInstant.put(`/user/${id}/update`, data);
};

export const serviceChangePassword = (id: string, data: any) => {
  return axiosInstant.put(`/user/${id}/change-password`, data);
};
