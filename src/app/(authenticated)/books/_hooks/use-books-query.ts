import { getBooks, TGetBooksParams } from '@/api/book';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBooksQuery = (params: TGetBooksParams) => {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks(params),
  });
};
