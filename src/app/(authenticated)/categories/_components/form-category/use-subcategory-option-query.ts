import { getCategories, TGetCategoriesParams } from '@/api/category';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useCategoryOptionQuery = (params?: TGetCategoriesParams) => {
  return useQuery({
    queryKey: ['category-option', params],
    queryFn: () => getCategories(params),
    select: (data) =>
      data.data.map((item) => ({ value: item.id, label: item.name })),
  });
};
