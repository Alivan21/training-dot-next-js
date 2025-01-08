import { TCreateAuthorRequest, updateAuthor } from '@/api/author';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateAuthorMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-author', id],
    mutationFn: (data: TCreateAuthorRequest) => updateAuthor(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
    },
  });
};
