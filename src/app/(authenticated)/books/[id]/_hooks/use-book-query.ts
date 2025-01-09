import { getBook } from '@/api/book';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBookQuery = (id: string) => {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => getBook(id),
  });
};
