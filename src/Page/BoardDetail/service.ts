import { axiosInstant } from '@/apis/request';

export const serviceBoardDetail = (slug: any) => {
  return axiosInstant.get(`/board/${slug}`);
};

export const serviceUpdateColumns = (id: any, data: any) => {
  return axiosInstant.put(`/board/${id}`, data);
};

export const serviceUpdateCards = (id: any, data: any) => {
  return axiosInstant.put(`/column/${id}`, data);
};

export const serviceAddCard = (data: any) => {
  return axiosInstant.post(`/card`, data);
};

export const serviceAddColumn = (data: any) => {
  return axiosInstant.post(`/column`, data);
};
