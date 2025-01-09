import { createBook, TCreateBookRequest } from '@/api/book';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-book'],
    mutationFn: (payload: TCreateBookRequest) => createBook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
