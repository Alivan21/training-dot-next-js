'use client';

import { useFilter } from '@/app/_hooks/datatable/use-filter';
import { useRouter } from 'next/navigation';
import { useAuthorsQuery } from './_hooks/use-authors-query';
import { useDeleteAuthorMutation } from './_hooks/use-delete-author-mutation';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import { Page } from 'admiral';
import Datatable from 'admiral/table/datatable';
import Link from 'next/link';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Flex, message } from 'antd';
import { TGetAuthorResponse } from '@/api/author';
import { ColumnsType } from 'antd/es/table';

const AuthorsPage = () => {
  const router = useRouter();
  const { filters, pagination, handleChange } = useFilter();
  const authorsQuery = useAuthorsQuery({
    ...pagination,
    sort_by: filters.sort_by,
    order: filters.order?.toLowerCase(),
    birthdate: filters.birthdate?.toLowerCase(),
  });
  const deleteAuthorMutation = useDeleteAuthorMutation();

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Authors',
      path: '/authors',
    },
  ];
  const columns: ColumnsType<TGetAuthorResponse> = [
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
      dataIndex: 'nationality',
      key: 'nationality',
      title: 'Nationality',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'nationality'),
    },
    {
      dataIndex: 'Action',
      title: 'Action',
      key: 'Action',
      render: (_, record) => {
        return (
          <Flex>
            <Link href={`/authors/${record.id}`}>
              <Button
                type="link"
                icon={<EyeOutlined style={{ color: 'green' }} />}
              />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => {
                deleteAuthorMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success('User berhasil dihapus');
                    router.refresh();
                  },
                });
              }}
            />
            <Link href={`/authors/${record.id}/update`}>
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  return (
    <Page
      title="Authors"
      breadcrumbs={breadcrumbs}
      topActions={<TopAction />}
      noStyle
    >
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={authorsQuery.isLoading}
        source={makeSource(authorsQuery.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};
export default AuthorsPage;

const TopAction = () => (
  <Link href="/authors/create">
    <Button icon={<PlusCircleOutlined />}>Add Author</Button>
  </Link>
);
