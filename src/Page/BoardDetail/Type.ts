import { atom } from 'jotai';
export const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};
export const atomDragItemType = atom<any | null>(null);
export const atomDragItemId = atom<any | null>(null);
export const atomData = atom<any | null>([]);
