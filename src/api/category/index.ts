import { TResponseData, TResponsePaginate } from '@/common/types/response';
import { axios } from '@/utils/fetcher';

export type TGetCategoriesParams = {
  page?: number;
  sort_by?: string;
  order?: string;
  search?: string;
};

export type TGetCategoryResponse = {
  name: string;
  description: string;
  parent_category_id: number;
  subcategories: {
    name: string;
    id: number;
  }[];
  id: number;
};

export type TCreateCategoryRequest = {
  name: string;
  description: string;
  parentCategory_id?: number;
  subcategory_ids: number[];
};

export const getCategories = async (params?: TGetCategoriesParams) => {
  const { data } = await axios.get<TResponsePaginate<TGetCategoryResponse>>(
    '/api/categories',
    { params }
  );
  return data;
};

export const getCategory = async (id: string) => {
  const { data } = await axios.get<TResponseData<TGetCategoryResponse>>(
    `/api/categories/${id}`
  );
  return data;
};

export const createCategory = async (payload: TCreateCategoryRequest) => {
  const { data } = await axios.post<TResponseData<TCreateCategoryRequest>>(
    '/api/categories',
    payload
  );
  return data;
};

export const updateCategory = async (
  id: string,
  payload: TCreateCategoryRequest
) => {
  const { data } = await axios.put<TResponseData<TCreateCategoryRequest>>(
    `/api/categories/${id}`,
    payload
  );
  return data;
};

export const deleteCategory = async (id: string | number) => {
  const { data } = await axios.delete<TResponseData<TCreateCategoryRequest>>(
    `/api/categories/${id}`
  );
  return data;
};
