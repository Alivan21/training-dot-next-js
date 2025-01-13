import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';

export type TGetBorrowingsParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
  status?: string;
  user_id?: string;
  book_id?: string;
  borrowed_date?: string;
  return_date?: string;
};

export type TGetBorrowingsResponse = {
  id: number;
  user_id: number;
  book_id: number;
  borrowed_date: string;
  return_date: string;
  status: string;
  user: {
    id: number;
    name: string;
  };
  book: {
    id: number;
    title: string;
  };
};

export type TCreateBorrowingRequest = {
  user_id: number;
  book_id: number;
  borrowed_date: string;
  return_date: string;
  status: string;
};

export const getBorrowings = async (params?: TGetBorrowingsParams) => {
  const { data } = await axios.get<TResponsePaginate<TGetBorrowingsResponse>>(
    '/api/borrowings',
    { params }
  );
  return data;
};

export const getBorrowing = async (id: string) => {
  const { data } = await axios.get<TResponseData<TGetBorrowingsResponse>>(
    `/api/borrowings/${id}`
  );
  return data;
};

export const createBorrowings = async (payload: TCreateBorrowingRequest) => {
  const { data } = await axios.post<TResponseData<TCreateBorrowingRequest>>(
    '/api/borrowings',
    payload
  );
  return data;
};

export const updateBorrowings = async (
  id: string,
  payload: TCreateBorrowingRequest
) => {
  const { data } = await axios.put<TResponseData<TCreateBorrowingRequest>>(
    `/api/borrowings/${id}`,
    payload
  );
  return data;
};

export const deleteBorrowings = async (
  id: number | string
): Promise<TResponseData<TGetBorrowingsResponse>> => {
  const { data } = await axios.delete<TResponseData<TGetBorrowingsResponse>>(
    `/api/borrowings/${id}`
  );
  return data;
};
