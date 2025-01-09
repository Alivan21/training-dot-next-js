import { createBorrowings, TCreateBorrowingRequest } from '@/api/borrowings';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useCreateBorrowingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-borrowing'],
    mutationFn: (payload: TCreateBorrowingRequest) => createBorrowings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['borrowings'] });
    },
  });
};
