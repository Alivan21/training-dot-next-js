import { getAuthors, TGetAuthorParams } from '@/api/author';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useAuthorsQuery = (params: TGetAuthorParams) => {
  return useQuery({
    queryKey: ['authors', params],
    queryFn: () => getAuthors(params),
  });
};
