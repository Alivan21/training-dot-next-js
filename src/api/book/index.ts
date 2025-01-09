import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';

export type TGetBooksParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  isbn?: string;
  search?: string;
};

export type TGetBooksResponse = {
  id: number;
  title: string;
  authors: {
    name: string;
    birthdate: string;
    biography: 'string';
    nationality: 'string';
    id: number;
  }[];
  isbn: string;
  published_date: string;
  quantity: number;
  categories: {
    id: number;
    name: 'string';
    description: 'string';
    parent_category_id: number;
    subcategories: {
      id: number;
      name: string;
    }[];
  }[];
  description: string;
  publisher: {
    name: string;
    id: string;
  };
  page_count: number;
  language: string;
};

export type TCreateBookRequest = {
  title: string;
  author_ids: number[];
  isbn: string;
  published_date: string;
  quantity: string;
  category_ids: number[];
  description: string;
  publisher_id: number;
  page_count: string;
  language: string;
};

export const getBooks = async (
  params?: TGetBooksParams
): Promise<TResponsePaginate<TGetBooksResponse>> => {
  const { data } = await axios.get<TResponsePaginate<TGetBooksResponse>>(
    '/api/books',
    { params }
  );
  return data;
};

export const getBook = async (
  id: string
): Promise<TResponseData<TGetBooksResponse>> => {
  const { data } = await axios.get<TResponseData<TGetBooksResponse>>(
    `/api/books/${id}`
  );
  return data;
};

export const createBook = async (
  payload: TCreateBookRequest
): Promise<TResponseData<TCreateBookRequest>> => {
  const { data } = await axios.post<TResponseData<TCreateBookRequest>>(
    '/api/books',
    payload
  );
  return data;
};

export const updateBook = async (
  id: string,
  payload: TCreateBookRequest
): Promise<TResponseData<TCreateBookRequest>> => {
  const { data } = await axios.put<TResponseData<TCreateBookRequest>>(
    `/api/books/${id}`,
    payload
  );
  return data;
};

export const deleteBook = async (id: string | number) => {
  const { data } = await axios.delete(`/api/books/${id}`);
  return data;
};
