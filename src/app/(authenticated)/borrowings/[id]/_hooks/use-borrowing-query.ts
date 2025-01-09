import { getBorrowing } from '@/api/borrowings';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBorrowingQuery = (id: string) => {
  return useQuery({
    queryKey: ['borrowings', id],
    queryFn: () => getBorrowing(id),
  });
};
