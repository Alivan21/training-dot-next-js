import { createUser } from '@/api/user';
import { useMutation } from '@/hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: createUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
