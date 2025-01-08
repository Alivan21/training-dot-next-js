import { getAuthor } from '@/api/author';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useAuthorQuery = (id: string) => {
  return useQuery({
    queryKey: ['authors', id],
    queryFn: () => getAuthor(id),
  });
};
