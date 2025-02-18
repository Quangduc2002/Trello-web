import { axiosInstant } from '@/apis/request';

// api board
export const serviceBoardDetail = (slug: any) => {
  return axiosInstant.get(`/board/${slug}`);
};

export const serviceUpdateColumns = (id: any, data: any) => {
  return axiosInstant.put(`/board/${id}`, data);
};

export const serviceRemoveMember = (data: any) => {
  return axiosInstant.put(`/board/remove-member`, data);
};

// api column
export const serviceUpdateCards = (id: any, data: any) => {
  return axiosInstant.put(`/column/${id}`, data);
};

export const serviceAddColumn = (data: any) => {
  return axiosInstant.post(`/column`, data);
};

export const serviceMoveCardColumn = (data: any) => {
  return axiosInstant.put(`/column/move-card-column`, data);
};

export const serviceDeleteColumn = (id: string, config: { data: { boardId: string } }) => {
  return axiosInstant.delete(`/column/${id}/delete`, config);
};

// api Card
export const serviceAddCard = (data: any) => {
  return axiosInstant.post(`/card`, data);
};

export const serviceDeleteCard = (id: string, config: { data: { columnId: string } }) => {
  return axiosInstant.delete(`/card/${id}/delete`, config);
};

export const serviceEditCard = (id: string, data: any) => {
  return axiosInstant.put(`/card/${id}/edit`, data);
};

// api Invited
export const serviceInvationMember = (id: string, data: any) => {
  return axiosInstant.post(`/invitation/${id}`, data);
};
