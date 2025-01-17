import Container from '@/components/UI/Container/Container';
import BoardBar from '@/Page/BoardDetail/BoardBar/BoardBar';
import { useState } from 'react';
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
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useAtom } from 'jotai';
import { cloneDeep, isEmpty } from 'lodash';
import { moveCartBetweenColumns } from '@/store/moveCart';
import { useRequest } from 'ahooks';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIVE_DRAG_ITEM_TYPE, atomData, atomDragItemType } from './Type';
import {
  serviceAddColumn,
  serviceBoardDetail,
  serviceMoveCardColumn,
  serviceUpdateCards,
  serviceUpdateColumns,
} from './service';
import BoardContent from './BoardContent/BoardContent';
import { Form } from 'antd';
import { toast } from '@/components/UI/Toast/toast';
import { placeholderCard } from '@/utils/placeholderCard';
import { findColumnByCartId } from '@/utils/findColumnByCard';
import { SortColumns } from '@/store/sortColumn';
import { SortCards } from '@/store/sortCard';
import { ROUTE_PATH } from '@/routes/route.constant';

type BoardParams = {
  slug: string;
};

function BoardDetail() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { slug } = useParams<BoardParams>();
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
  const [oldColumnDragCard, setOldColumnDragCard] = useState<any>(null);
  const [addColumn, setAddColumn] = useState<boolean>(false);
  const [data, setData] = useAtom(atomData);

  const handleCancel = () => {
    setAddColumn(false);
    form.resetFields();
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const { data: dataBoardDetail, loading } = useRequest(() => serviceBoardDetail(slug), {
    onSuccess: (res) => {
      const newBoard = { ...res?.data[0] };
      // sắp sếp column
      newBoard.columns = SortColumns(newBoard);
      // sắp xếp card
      newBoard?.columns?.map((column: any) => {
        if (isEmpty(column?.cards)) {
          column.cards = [placeholderCard(column)];
          column.cardOrderIds = [`${column._id}-placeholder-card`];
        } else {
          column.cards = SortCards(column);
        }
      });

      setData(newBoard ?? []);
    },
  });

  const { run: runMoveColumn } = useRequest(serviceUpdateColumns, {
    manual: true,
  });

  const { run: runMoveCard } = useRequest(serviceUpdateCards, {
    manual: true,
  });

  const { run: runAddColumn } = useRequest(serviceAddColumn, {
    manual: true,
    onSuccess: (res) => {
      const newBoard = { ...data };
      newBoard.columns.push(res?.data);
      newBoard.columnOrderIds.push(res?.data?._id);

      const columnUpdate = newBoard?.columns?.find((column: any) => column?._id === res?.data?._id);

      if (isEmpty(columnUpdate?.cards)) {
        columnUpdate.cards = [placeholderCard(res?.data)];
      }

      setData(newBoard);
      setAddColumn(false);
      form.resetFields();
      toast.success('Thêm column thành công');
    },
    onError: () => {
      toast.error('Thêm column không thành công');
    },
  });

  const { run: runMoveCardColumn } = useRequest(serviceMoveCardColumn, {
    manual: true,
  });

  const handleDragStart = (event: any) => {
    setAcctiveDragItemId(event?.active?.id);
    setAcctiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?.columnId) {
      setOldColumnDragCard(findColumnByCartId(event?.active?.id, data));
    }
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

    const activeColumn = findColumnByCartId(activeCardId, data);
    const overColumn = findColumnByCartId(overCardId, data);

    if (!activeColumn || !overColumn) {
      return;
    }

    if (oldColumnDragCard?._id !== overColumn?._id) {
      moveCartBetweenColumns({
        setData,
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        acctiveDragItemId,
        activeDragItemData,
        triggerForm: 'handleDragOver',
        moveCardToColumn,
        oldColumnDragCard,
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

      const activeColumn = findColumnByCartId(activeCardId, data);
      const overColumn = findColumnByCartId(overCardId, data);

      if (!activeColumn || !overColumn) {
        return;
      }

      if (oldColumnDragCard?._id !== overColumn?._id) {
        moveCartBetweenColumns({
          setData,
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          acctiveDragItemId,
          activeDragItemData,
          triggerForm: 'handleDragEnd',
          moveCardToColumn,
          oldColumnDragCard,
        });
      } else {
        const activeCardIndex = activeColumn?.cards?.findIndex(
          (item: any) => item._id === acctiveDragItemId,
        );
        const overCardIndex = overColumn?.cards?.findIndex((item: any) => item._id === overCardId);

        const UpdateCard = arrayMove(activeColumn?.cards, activeCardIndex, overCardIndex);

        moveCards(UpdateCard, oldColumnDragCard._id);
        setData((prev: any) => {
          const nextColumns = cloneDeep(prev);
          const targetColumn = nextColumns?.columns?.find(
            (column: any) => column._id === overColumn._id,
          );
          targetColumn.cards = UpdateCard;
          targetColumn.cardOrderIds = UpdateCard?.map((card: any) => card._id);

          return nextColumns;
        });
      }
    }

    if (acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      const activeColumnIndex = data?.columns.findIndex((item: any) => item._id === active.id);
      const overColumnIndex = data?.columns.findIndex((item: any) => item._id === over.id);
      const UpdateColumn = arrayMove(data?.columns, activeColumnIndex, overColumnIndex);

      moveColumns(UpdateColumn);

      setData((prev: any) => ({ ...prev, columns: UpdateColumn }));
    }

    setAcctiveDragItemType(null);
    setAcctiveDragItemId(null);
    setActiveDragItemData(null);
  };

  const handleAddColumn = () => {
    runAddColumn({
      boardId: dataBoardDetail?.data[0]._id,
      title: form?.getFieldValue('titleColumn'),
    });
  };

  const moveColumns = async (columnOrder: any) => {
    const columnOrderIds = columnOrder?.map((column: any) => column?._id);
    const newBoard = { ...data };
    newBoard.columns = columnOrder;
    newBoard.columnOrderIds = columnOrderIds;
    setData(newBoard);

    runMoveColumn(newBoard?._id, { columnOrderIds: columnOrderIds });
  };

  const moveCards = async (cardOrder: any, columnId: any) => {
    const newBoard = { ...data };
    const cardOrderIds = cardOrder?.map((column: any) => column?._id);
    const columnUpdate = newBoard?.columns?.find((column: any) => column._id === columnId);

    columnUpdate.cards = cardOrder;
    columnUpdate.cardOrderIds = cardOrderIds;
    setData(newBoard);

    runMoveCard(columnId, { cardOrderIds: cardOrderIds });
  };

  const moveCardToColumn = ({ currentCardId, prevColumnId, nextColumnId, orderColums }: any) => {
    const newBoard = { ...data };
    newBoard.columns = orderColums?.column;

    runMoveCardColumn({
      currentCardId,
      prevColumnId,
      nextColumnId,
      prevCardOrderIds: orderColums?.columns?.find((column: any) => column?._id === prevColumnId)
        ?.cardOrderIds,
      nextCardOrderIds: orderColums?.columns?.find((column: any) => column?._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  if (dataBoardDetail?.data?.length === 0) {
    navigate(ROUTE_PATH.HOME);
    return null;
  }

  return (
    <Container className='flex overflow-x-scroll h-full'>
      {!loading && data?.columns && data?.columns.length > 0 && (
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          sensors={sensors}
          autoScroll={false}
        >
          <SortableContext
            items={data?.columns?.map((item: any) => item._id)}
            strategy={horizontalListSortingStrategy}
          >
            {data?.columns?.map((item: any) => (
              <BoardBar
                key={item?._id}
                dataColumn={item}
                setAddContentColumn={setAddContentColumn}
                addContentColumn={addContentColumn}
              />
            ))}
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimation}>
            {(!acctiveDragItemId || !acctiveDragItemType) && null}
            {acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <BoardBar dataColumn={activeDragItemData} setAddContentColumn={setAddContentColumn} />
            )}

            {activeDragItemData?._id && acctiveDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <BoardContent dataCard={activeDragItemData} />
            )}
          </DragOverlay>
        </DndContext>
      )}

      <Form layout='vertical' className='form-card' form={form}>
        <div
          className={`overflow-auto p-[8px] mx-[8px] w-[240px] min-w-[240px] bg-[--background-header] cursor-pointer rounded-xl max-h-full h-max ${
            !addColumn && 'hover:bg-[--background-modal-hover]'
          }`}
        >
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
              <Form.Item
                name='titleColumn'
                rules={[{ whitespace: true, required: true, message: 'Vui lòng không để trống !' }]}
              >
                <InputText placeholder='Nhập tên danh sách...' />
              </Form.Item>
              <div className='flex gap-2 items-center pb-2'>
                <Form.Item dependencies={['titleColumn']}>
                  {({ getFieldsValue }) => {
                    const { titleColumn } = getFieldsValue();
                    const disabled = !titleColumn || !titleColumn.trim();
                    return (
                      <Button
                        disabled={disabled}
                        type='xhotel-primary'
                        className='!px-[20px]'
                        onClick={() => handleAddColumn()}
                      >
                        <Text type='body2'>Thêm danh sách</Text>
                      </Button>
                    );
                  }}
                </Form.Item>
                <div
                  onClick={handleCancel}
                  className='flex items-center justify-center hover:bg-[--background-modal-hover] p-2 rounded-[6px] cursor-pointer'
                >
                  <Icon icon='icon-close' className='text-[18px] text-[--bs-navbar-color] ' />
                </div>
              </div>
            </div>
          )}
        </div>
      </Form>
    </Container>
  );
}

export default BoardDetail;
