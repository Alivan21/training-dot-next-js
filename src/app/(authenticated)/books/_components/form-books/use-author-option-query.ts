import { getAuthors, TGetAuthorParams } from '@/api/author';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useAuthorOptionQuery = (params?: TGetAuthorParams) => {
  return useQuery({
    queryKey: ['author-option', params],
    queryFn: () => getAuthors(params),
    select: (data) =>
      data.data.map((item) => ({ value: item.id, label: item.name })),
  });
};
