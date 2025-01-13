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
import { Button, DatePicker, Flex, message } from 'antd';
import Link from 'next/link';
import { useBorrowingsQuery } from './_hooks/use-borrowings-query';
import { ColumnsType } from 'antd/es/table';
import { TGetBorrowingsResponse } from '@/api/borrowings';
import { formatToIndonesianDate } from '@/utils/format-date';
import { useRouter } from 'next/navigation';
import { useDeleteBorrowingMutation } from './_hooks/use-delete-borrowing-mutation';
import { TFilterItem } from 'admiral/table/filter-collection/factory';
import { useBookOptionQuery } from './_components/form-borrowings/use-book-option-query';
import { useUserOptionQuery } from './_components/form-borrowings/use-user-option-query';
import dayjs from 'dayjs';

const BorrowingsPage = () => {
  const router = useRouter();
  const { filters, pagination, handleChange } = useFilter();

  const borrowingQuery = useBorrowingsQuery({
    ...pagination,
    ...filters,
    sort_by: filters.sort_by,
    order: filters.order?.toLowerCase(),
    status: filters.status,
  });
  const deleteBorrowingMutation = useDeleteBorrowingMutation();

  const bookOptionQuery = useBookOptionQuery();
  const userOptionQuery = useUserOptionQuery();

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Borrowings',
      path: '/borrowings',
    },
  ];

  const columns: ColumnsType<TGetBorrowingsResponse> = [
    {
      dataIndex: 'id',
      key: 'id',
      title: 'Id',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'id'),
    },
    {
      dataIndex: ['user', 'name'],
      key: 'user_name',
      title: 'Nama Pengguna',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'user_name'),
    },
    {
      dataIndex: ['book', 'title'],
      key: 'book_name',
      title: 'Nama Buku',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'book_name'),
    },
    {
      dataIndex: 'borrowed_date',
      key: 'borrowed_date',
      title: 'Tanggal Peminjaman',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'borrowed_date'),
      render: (date: string) => formatToIndonesianDate(date),
    },
    {
      dataIndex: 'return_date',
      key: 'return_date',
      title: 'Tanggal Pengembalian',
      sorter: true,
      sortOrder: makeSortOrder(filters, 'return_date'),
      render: (date: string) => formatToIndonesianDate(date),
    },
    {
      dataIndex: 'Action',
      title: 'Action',
      key: 'Action',
      render: (_, record) => {
        return (
          <Flex>
            <Link href={`/borrowings/${record.id}`}>
              <Button
                type="link"
                icon={<EyeOutlined style={{ color: 'green' }} />}
              />
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: 'red' }} />}
              onClick={() => {
                deleteBorrowingMutation.mutate(record.id, {
                  onSuccess: () => {
                    message.success('Peminjaman berhasil dihapus');
                    router.refresh();
                  },
                });
              }}
            />
            <Link href={`/borrowings/${record.id}/update`}>
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const filterComponents: TFilterItem[] = [
    {
      name: 'user_id',
      label: 'User',
      type: 'Select',
      placeholder: 'Filter by User',
      value: filters.user_id,
      options: userOptionQuery.data,
    },
    {
      name: 'book_id',
      label: 'Book',
      type: 'Select',
      placeholder: 'Filter by book',
      value: filters.book_id,
      options: bookOptionQuery.data,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'Select',
      placeholder: 'Filter by Status',
      value: filters.status,
      options: [
        { value: 'Borrowed', label: 'Borrowed' },
        { value: 'Returned', label: 'Returned' },
        { value: 'Overdue', label: 'Overdue' },
      ],
    },
    {
      name: 'borrowed_date',
      label: 'Tanggal Peminjaman',
      placeholder: 'Tanggal Peminjaman',
      value: filters.borrowed_date,
      render: (props: any) => (
        <DatePicker
          {...props}
          value={props.value ? dayjs(props.value) : undefined}
          format="YYYY-MM-DD"
          onChange={(date) => {
            props.onChange(date ? dayjs(date).format('YYYY-MM-DD') : undefined);
          }}
        />
      ),
    },
    {
      name: 'return_date',
      label: 'Tanggal Pengembalian',
      placeholder: 'Tanggal Pengembalian',
      value: filters.return_date,
      render: (props: any) => (
        <DatePicker
          {...props}
          value={props.value ? dayjs(props.value) : undefined}
          format="YYYY-MM-DD"
          onChange={(date) => {
            props.onChange(date ? dayjs(date).format('YYYY-MM-DD') : undefined);
          }}
        />
      ),
    },
  ];

  return (
    <Page
      title="Borrowings"
      breadcrumbs={breadcrumbs}
      topActions={<TopAction />}
      noStyle
    >
      <Datatable
        onChange={handleChange}
        rowKey="id"
        showRowSelection={false}
        loading={borrowingQuery.isLoading}
        source={makeSource(borrowingQuery.data)}
        columns={columns}
        search={filters.search}
        filterComponents={filterComponents}
      />
    </Page>
  );
};
export default BorrowingsPage;

const TopAction = () => (
  <Link href="/borrowings/create">
    <Button icon={<PlusCircleOutlined />}>Add Borrowing</Button>
  </Link>
);
