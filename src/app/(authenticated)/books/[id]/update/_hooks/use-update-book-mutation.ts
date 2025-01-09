import { TCreateBookRequest, updateBook } from '@/api/book';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateBookMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-book'],
    mutationFn: (payload: TCreateBookRequest) => updateBook(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
