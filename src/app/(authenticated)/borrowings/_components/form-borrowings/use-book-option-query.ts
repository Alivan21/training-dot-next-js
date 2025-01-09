import { getBooks, TGetBooksParams } from '@/api/book';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useBookOptionQuery = (params?: TGetBooksParams) => {
  return useQuery({
    queryKey: ['book-option', params],
    queryFn: () => getBooks(params),
    select: (data) =>
      data.data.map((item) => ({ value: item.id, label: item.title })),
  });
};
