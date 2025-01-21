import { atom } from 'jotai';
export const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};
export const atomDragItemType = atom<any | null>(null);
export const atomDragItemId = atom<any | null>(null);
export const atomData = atom<any | null>([]);
export const atomEditCard = atom<string | null>(null);

export interface IColumn {
  boardId: string;
  cardOrderIds: any[];
  title: string;
  _destroy: boolean;
  _id: string;
  cards: any[];
}
