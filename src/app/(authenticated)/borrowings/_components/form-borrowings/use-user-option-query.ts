import { getUsers, TGetUsersParams } from '@/api/user';
import { useQuery } from '@/app/_hooks/request/use-query';

export const useUserOptionQuery = (params?: TGetUsersParams) => {
  return useQuery({
    queryKey: ['user-option', params],
    queryFn: () => getUsers(params),
    select: (data) =>
      data.data.map((item) => ({ value: item.id, label: item.name })),
  });
};
