export const SortCards = (data: any) => {
  const sortedCards = data?.cardOrderIds?.map((id: any) =>
    data?.cards?.find((card: any) => card?._id === id),
  );

  return sortedCards;
};
