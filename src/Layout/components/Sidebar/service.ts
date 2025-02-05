import { axiosInstant } from '@/apis/request';

export const serviceBoardAll = () => {
  return axiosInstant.get(`/board`);
};

export const serviceCreateBoard = (data: any) => {
  return axiosInstant.post(`/board`, data);
};

export const serviceDeleteBoard = (id: string) => {
  return axiosInstant.put(`/board/${id}/delete`);
};
