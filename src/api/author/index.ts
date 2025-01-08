import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';

export type TGetAuthorParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
  birthdate: string;
};

export type TGetAuthorResponse = {
  name: string;
  birthdate: string;
  biography: string;
  nationality: string;
  id: number;
};

export type TCreateAuthorRequest = {
  name: string;
  birthdate: string;
  biography: string;
  nationality: string;
};

export const getAuthors = async (params?: TGetAuthorParams) => {
  const { data } = await axios.get<TResponsePaginate<TGetAuthorResponse>>(
    'api/authors',
    { params }
  );
  return data;
};

export const getAuthor = async (id: string) => {
  const { data } = await axios.get<TResponseData<TGetAuthorResponse>>(
    `/api/authors/${id}`
  );
  return data;
};

export const createAuthor = async (payload: TCreateAuthorRequest) => {
  const { data } = await axios.post<TResponseData<TCreateAuthorRequest>>(
    '/api/authors',
    payload
  );
  return data;
};

export const updateAuthor = async (
  id: string,
  payload: TCreateAuthorRequest
) => {
  const { data } = await axios.put<TResponseData<TCreateAuthorRequest>>(
    `/api/authors/${id}`,
    payload
  );
  return data;
};

export const deleteAuthor = async (id: string | number) => {
  const { data } = await axios.delete<TResponseData<TGetAuthorResponse>>(
    `/api/authors/${id}`
  );
  return data;
};
