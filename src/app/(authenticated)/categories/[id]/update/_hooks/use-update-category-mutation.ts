import { TCreateCategoryRequest, updateCategory } from '@/api/category';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateCategoryMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-category'],
    mutationFn: (data: TCreateCategoryRequest) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
