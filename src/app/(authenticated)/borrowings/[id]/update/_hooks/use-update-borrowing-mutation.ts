import { TCreateBorrowingRequest, updateBorrowings } from '@/api/borrowings';
import { useMutation } from '@/app/_hooks/request/use-mutation';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateBorrowingMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-borrowing', id],
    mutationFn: (data: TCreateBorrowingRequest) => updateBorrowings(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['borrowings'] });
    },
  });
};
