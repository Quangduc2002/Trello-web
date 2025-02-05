import { atom } from 'jotai';

export interface TProfile {
  _id: string;
  email: string;
  name: string;
}

// @ts-ignore
export const atomProfiole = atom<TProfile | null>({});
