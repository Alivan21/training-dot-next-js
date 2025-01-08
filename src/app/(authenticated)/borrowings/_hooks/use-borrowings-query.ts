import { getBorrowings, TGetBorrowingsParams } from '@/api/borrowings';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBorrowingsQuery = (params: TGetBorrowingsParams) => {
  return useQuery({
    queryKey: ['borrowings', params],
    queryFn: () => getBorrowings(params),
  });
};
