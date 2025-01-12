import Container from '@/components/UI/Container/Container';
import BoardBar from '@/Page/Home/Components/BoardBar/BoardBar';
import { mockData } from '@/apis/mock-data';
import { useEffect, useState } from 'react';
import Text from '@/components/UI/Text';
import { Icon } from '@/components/UI/IconFont/Icon';
import InputText from '@/components/UI/InputText';
import Button from '@/components/UI/Button/Button';
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { useAtom } from 'jotai';
import { ACTIVE_DRAG_ITEM_TYPE, atomDragItemId, atomDragItemType } from './Type';
import BoardContent from './Components/BoardContent/BoardContent';
import { cloneDeep } from 'lodash';
import { moveCartBetweenColumns } from '@/store/moveCart';

function Home() {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 10 },
    }),
  );
  const [addContentColumn, setAddContentColumn] = useState<any>(null);
  const [acctiveDragItemId, setAcctiveDragItemId] = useState(null);
  const [acctiveDragItemType, setAcctiveDragItemType] = useAtom(atomDragItemType);
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);
  const [addColumn, setAddColumn] = useState<boolean>(false);
  const [dataColumn, setDataColumn] = useState<any>([]);

  const data = mockData?.board;
  useEffect(() => {
    if (data && data?.columns) {
      setDataColumn(data?.columns);
    }
  }, [data]);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const findColumnByCartId = (CardId: any) => {
    return dataColumn?.find((column: any) =>
      column?.cards?.map((card: any) => card?._id)?.includes(CardId),
    );
  };

  const handleDragStart = (event: any) => {
    setAcctiveDragItemId(event?.active?.id);
    setAcctiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const handleDragOver = (event: any) => {
    if (acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    const { active, over } = event;
    if (!active || !over) {
      return;
    }
    const {
      id: activeCardId,
      data: { current: activeCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn = findColumnByCartId(activeCardId);
    const overColumn = findColumnByCartId(overCardId);

    if (!activeColumn || !overColumn) {
      return;
    }

    if (activeColumn?._id !== overColumn?._id) {
      moveCartBetweenColumns({
        setDataColumn,
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        acctiveDragItemId,
        activeDragItemData,
      });
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeCardId,
        data: { current: activeCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn = findColumnByCartId(activeCardId);
      const overColumn = findColumnByCartId(overCardId);

      if (!activeColumn || !overColumn) {
        return;
      }

      if (activeColumn?._id !== overColumn?._id) {
        moveCartBetweenColumns({
          setDataColumn,
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          acctiveDragItemId,
          activeDragItemData,
        });
      } else {
        const activeCardIndex = activeColumn?.cards?.findIndex(
          (item: any) => item._id === acctiveDragItemId,
        );
        const overCardIndex = overColumn?.cards?.findIndex((item: any) => item._id === overCardId);

        const UpdateCard = arrayMove(activeColumn?.cards, activeCardIndex, overCardIndex);

        setDataColumn((prev: any) => {
          const nextColumns = cloneDeep(prev);
          const targetColumn = nextColumns?.find((column: any) => column._id === overColumn._id);
          targetColumn.cards = UpdateCard;
          targetColumn.cardOrderIds = UpdateCard?.map((card: any) => card._id);

          return nextColumns;
        });
      }
    }

    if (acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      const activeColumnIndex = dataColumn.findIndex((item: any) => item._id === active.id);
      const overColumnIndex = dataColumn.findIndex((item: any) => item._id === over.id);
      const UpdateColumn = arrayMove(dataColumn, activeColumnIndex, overColumnIndex);

      setDataColumn(UpdateColumn);
    }

    setAcctiveDragItemType(null);
    setAcctiveDragItemId(null);
    setActiveDragItemData(null);
  };

  return (
    <Container className='flex py-[16px] overflow-x-scroll h-full'>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        sensors={sensors}
        autoScroll={false}
      >
        <SortableContext
          items={dataColumn?.map((item: any) => item._id)}
          strategy={horizontalListSortingStrategy}
        >
          {dataColumn?.map((item: any) => (
            <BoardBar
              key={item?._id}
              data={item}
              setAddContentColumn={setAddContentColumn}
              addContentColumn={addContentColumn}
            />
          ))}
        </SortableContext>
        <DragOverlay dropAnimation={dropAnimation}>
          {(!acctiveDragItemId || !acctiveDragItemType) && null}
          {acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <BoardBar data={activeDragItemData} setAddContentColumn={setAddContentColumn} />
          )}

          {activeDragItemData?._id && acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <BoardContent dataCard={activeDragItemData} />
          )}
        </DragOverlay>
      </DndContext>

      <div className='p-[8px] mx-[8px] w-[240px] min-w-[240px] bg-[--background-header]  hover:bg-[--background-modal-hover] cursor-pointer rounded-xl max-h-full h-max'>
        {!addColumn ? (
          <div
            onClick={() => setAddColumn(true)}
            className='flex items-center gap-2 text-[--bs-navbar-color] px-4'
          >
            <div className='flex items-center justify-center rounded-[6px] '>
              <Icon
                icon='icon-plus'
                className='text-[18px] text-[--bs-navbar-color] cursor-pointer'
              />
            </div>
            <Text type='body2' className='font-bold'>
              Thêm danh sách khác
            </Text>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <InputText placeholder='Nhập tên danh sách...' />
            <div className='flex gap-2 items-center pb-2'>
              <Button type='xhotel-primary' className='!px-[20px]'>
                <Text type='body2'>Thêm danh sách</Text>
              </Button>
              <div
                onClick={() => setAddColumn(false)}
                className='flex items-center justify-center hover:bg-[--background-modal-hover] p-2 rounded-[6px] cursor-pointer'
              >
                <Icon icon='icon-close' className='text-[18px] text-[--bs-navbar-color] ' />
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Home;
