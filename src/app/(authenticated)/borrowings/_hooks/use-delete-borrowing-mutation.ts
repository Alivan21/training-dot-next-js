import { deleteBorrowings } from '@/api/borrowings';
import { useMutation } from '@/app/_hooks/request/use-mutation';

export const useDeleteBorrowingMutation = () => {
  return useMutation({
    mutationKey: ['delete-borrowing'],
    mutationFn: deleteBorrowings,
  });
};
