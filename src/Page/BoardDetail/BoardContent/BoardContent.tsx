import Text from '@/components/UI/Text';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IBoardContent {
  dataCard: any;
  addContentColumn?: any;
}

function BoardContent({ dataCard, addContentColumn }: IBoardContent) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: dataCard._id,
    data: { ...dataCard },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'pointer',
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div
      className={`bg-[--background-modal] px-[12px] py-[8px] rounded-xl z-10
        ${dataCard?.FE_PlaceholderCard ? 'invisible' : 'visible'}
        ${
          addContentColumn === dataCard?.columnId && dataCard?.FE_PlaceholderCard
            ? 'hidden'
            : 'block'
        }
        `}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
      }}
    >
      <div>
        <Text className='text-[--bs-navbar-color]'>{dataCard?.title}</Text>
      </div>
    </div>
  );
}

export default BoardContent;
