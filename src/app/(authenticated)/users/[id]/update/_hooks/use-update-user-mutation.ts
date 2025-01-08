import { TUpdateUserPayload, updateUser } from '@/api/user';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateUserMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-user', id],
    mutationFn: (data: TUpdateUserPayload) => updateUser(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
