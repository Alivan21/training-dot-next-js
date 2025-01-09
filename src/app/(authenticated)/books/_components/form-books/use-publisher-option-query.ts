import { getPublishers, TGetPublishersParams } from '@/api/publishers';
import { useQuery } from '@/app/_hooks/request/use-query';

export const usePublisherOptionQuery = (params?: TGetPublishersParams) => {
  return useQuery({
    queryKey: ['publisher-option', params],
    queryFn: () => getPublishers(params),
    select: (data) =>
      data.data.map((item) => ({ value: item.id, label: item.name })),
  });
};
