import { axiosInstant } from '@/apis/request';

export const serviceCreateBoard = (data: any) => {
  return axiosInstant.post(`/board`, data);
};

export const serviceDeleteBoard = (id: string) => {
  return axiosInstant.put(`/board/${id}/delete`);
};
