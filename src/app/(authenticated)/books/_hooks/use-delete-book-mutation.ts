import { deleteBook } from '@/api/book';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-book'],
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
