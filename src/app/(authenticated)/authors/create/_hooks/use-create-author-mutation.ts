import { createAuthor } from '@/api/author';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateAuthorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-author'],
    mutationFn: createAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};
