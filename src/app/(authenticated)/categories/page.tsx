'use client';

import { useFilter } from '@/app/_hooks/datatable/use-filter';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Page } from 'admiral';
import Datatable from 'admiral/table/datatable';
import { Button, Flex, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCategoriesQuery } from './_hooks/use-categories-query';
import { ColumnsType } from 'antd/es/table';
import { TGetCategoryResponse } from '@/api/category';
import { useDeleteCategoryMutation } from './_hooks/use-delete-category-mutation';

const CategoriesPage = () => {
  const router = useRouter();
  const { filters, pagination, handleChange } = useFilter();
  const categoriesQuery = useCategoriesQuery({
    ...pagination,
    sort_by: filters.sort_by,
    order: filters.order?.toLowerCase(),
  });
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Category',
      path: '/categories',
    },
  ];
  const columns: ColumnsType<TGetCategoryResponse> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'id'),
    },
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'name'),
    },
    {
      dataIndex: 'description',
      key: 'description',
      title: 'Description',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'description'),
    },
    {
      dataIndex: 'Action',
      title: 'Action',
      key: 'Action',
      render: (_, record) => {
        return (
          <Flex>
            <Link href={`/categories/${record.id}`}>
              <Button
                type="link"
                icon={<EyeOutlined style={{ color: 'green' }} />}
              />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => {
                deleteCategoryMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success('Kategori berhasil dihapus');
                    router.refresh();
                  },
                });
              }}
            />
            <Link href={`/categories/${record.id}/update`}>
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  return (
    <Page
      title="Category"
      breadcrumbs={breadcrumbs}
      topActions={<TopAction />}
      noStyle
    >
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={categoriesQuery.isLoading}
        source={makeSource(categoriesQuery.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};
export default CategoriesPage;

const TopAction = () => (
  <Link href="/categories/create">
    <Button icon={<PlusCircleOutlined />}>Add Category</Button>
  </Link>
);
