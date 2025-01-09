import { getCategory } from '@/api/category';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useCategoryQuery = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => getCategory(id),
  });
};
