export const findColumnByCartId = (CardId: any, data: any) => {
  return data?.columns?.find((column: any) =>
    column?.cards?.map((card: any) => card?._id)?.includes(CardId),
  );
};
