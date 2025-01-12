import Text from '@/components/UI/Text';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IBoardContent {
  dataCard: any;
}

function BoardContent({ dataCard }: IBoardContent) {
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

  console.log(dataCard);

  return (
    <div
      className={`bg-[--background-modal] px-[12px] py-[8px] rounded-xl 
        ${dataCard?.FE_PlaceholderCard ? 'invisible' : 'visible'}
      `}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
      }}
    >
      <Text className='text-[--bs-navbar-color]'>{dataCard?.title}</Text>
    </div>
  );
}

export default BoardContent;
