export const SortColumns = (data: any) => {
  const sortedColumns = data?.columnOrderIds?.map((id: any) =>
    data?.columns?.find((column: any) => column?._id === id),
  );

  return sortedColumns;
};
