export const SortMembers = (data: any) => {
  const sortedMembers = data?.memberIds?.map((id: any) =>
    data?.members?.find((column: any) => column?._id === id),
  );

  return sortedMembers;
};
