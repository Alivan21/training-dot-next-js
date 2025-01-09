'use client';

import { useFilter } from '@/app/_hooks/datatable/use-filter';
import { useRouter } from 'next/navigation';
import { useBooksQuery } from './_hooks/use-books-query';
import { useDeleteBookMutation } from './_hooks/use-delete-book-mutation';
import { ColumnsType } from 'antd/es/table';
import { TGetBooksResponse } from '@/api/book';
import { makeSortOrder, makeSource } from '@/utils/data-table';
import { formatToIndonesianDate } from '@/utils/format-date';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Flex, message } from 'antd';
import Link from 'next/link';
import { EyeOutlined } from '@ant-design/icons';
import { Page } from 'admiral';
import Datatable from 'admiral/table/datatable';

const BooksPage = () => {
  const router = useRouter();
  const { filters, pagination, handleChange } = useFilter();
  const booksQuery = useBooksQuery({
    ...pagination,
    isbn: filters.isbn,
    sort_by: filters.sort_by,
    order: filters.order?.toLowerCase(),
  });
  const deleteBookMutation = useDeleteBookMutation();

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Books',
      path: '/books',
    },
  ];

  const columns: ColumnsType<TGetBooksResponse> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'id'),
    },
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Judul',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'title'),
    },
    {
      dataIndex: 'isbn',
      key: 'isbn',
      title: 'ISBN',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'isbn'),
    },
    {
      dataIndex: 'published_date',
      key: 'published_date',
      title: 'Tanggal Publikasi',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'published_date'),
      render: (date: string) => formatToIndonesianDate(date),
    },
    {
      dataIndex: 'Action',
      title: 'Action',
      key: 'Action',
      render: (_, record) => {
        return (
          <Flex>
            <Link href={`/books/${record.id}`}>
              <Button
                type="link"
                icon={<EyeOutlined style={{ color: 'green' }} />}
              />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => {
                deleteBookMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success('User berhasil dihapus');
                    router.refresh();
                  },
                });
              }}
            />
            <Link href={`/books/${record.id}/update`}>
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];
  return (
    <Page
      title="Books"
      breadcrumbs={breadcrumbs}
      topActions={<TopAction />}
      noStyle
    >
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={booksQuery.isLoading}
        source={makeSource(booksQuery.data)}
        columns={columns}
        search={filters.search}
      />
    </Page>
  );
};
export default BooksPage;

const TopAction = () => (
  <Link href="/books/create">
    <Button icon={<PlusCircleOutlined />}>Add Book</Button>
  </Link>
);
