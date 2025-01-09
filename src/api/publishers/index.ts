import { TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';

export type TGetPublishersParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TGetPublisherResponse = {
  id: number;
  name: string;
  address: string;
  contact: string;
};

export const getPublishers = async (
  params?: TGetPublishersParams
): Promise<TResponsePaginate<TGetPublisherResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetPublisherResponse>>(
    '/api/publishers',
    { params }
  );
  return data;
};
