import { placeholderCard } from '@/utils/placeholderCard';
import { cloneDeep, isEmpty } from 'lodash';

interface IMoveCartBetweenColumns {
  setDataColumn: (value: any) => void;
  overColumn: any;
  overCardId: any;
  active: any;
  over: any;
  activeColumn: any;
  acctiveDragItemId: any;
  activeDragItemData: any;
}

export const moveCartBetweenColumns = ({
  setDataColumn,
  overColumn,
  overCardId,
  active,
  over,
  activeColumn,
  acctiveDragItemId,
  activeDragItemData,
}: IMoveCartBetweenColumns) => {
  setDataColumn((prev: any) => {
    const overCardIndex = overColumn?.cards?.findIndex((cart: any) => cart?._id === overCardId);
    let newIndex: number;
    const isBelowOverItem =
      active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height;

    const modifier = isBelowOverItem ? 1 : 0;

    newIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
    const nextColumns = cloneDeep(prev);
    const nextActiveColumn: any = nextColumns?.find(
      (column: any) => column?._id === activeColumn?._id,
    );
    const nextOverColumn = nextColumns?.find((column: any) => column?._id === overColumn?._id);

    // nextActiveColumn column cũ
    if (nextActiveColumn) {
      nextActiveColumn.cards = nextActiveColumn.cards.filter(
        (card: any) => card._id !== acctiveDragItemId,
      );

      if (isEmpty(nextActiveColumn.cards)) {
        nextActiveColumn.cards = [placeholderCard(nextActiveColumn)];
      }

      nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card: any) => card._id);
    }

    if (nextOverColumn) {
      nextOverColumn.cards = nextOverColumn.cards.filter(
        (card: any) => card._id !== acctiveDragItemId,
      );

      const rebuildAcctiveDragItemData = {
        ...activeDragItemData,
        columnId: nextOverColumn._id,
      };

      nextOverColumn.cards = nextOverColumn.cards.toSpliced(
        newIndex,
        0,
        rebuildAcctiveDragItemData,
      );

      nextOverColumn.cards = nextOverColumn.cards.filter((card: any) => !card?.FE_PlaceholderCard);

      nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card: any) => card._id);
    }

    return nextColumns;
  });
};
