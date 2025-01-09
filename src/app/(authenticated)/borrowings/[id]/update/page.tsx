'use client';

import { useParams, useRouter } from 'next/navigation';
import { Col, Row, message } from 'antd';
import { Page } from 'admiral';
import dayjs from 'dayjs';
import { FormBorrowing } from '../../_components/form-borrowings';
import { useBorrowingQuery } from '../_hooks/use-borrowing-query';
import { useUpdateBorrowingMutation } from './_hooks/use-update-borrowing-mutation';
import { TCreateBorrowingRequest } from '@/api/borrowings';

const UpdateBorrowingPage = () => {
  const params = useParams();
  const router = useRouter();

  const borrowingId = typeof params.id === 'string' ? params.id : '';

  const borrowingQuery = useBorrowingQuery(borrowingId);
  const updateBorrowingMutation = useUpdateBorrowingMutation(borrowingId);

  const handleOnFinish = (data: TCreateBorrowingRequest) =>
    updateBorrowingMutation.mutate(data, {
      onSuccess: () => {
        router.push('/borrowings');
        message.success('Borrowing berhasil diupdate');
      },
      onError: () => {
        message.error('Borrowing gagal diupdate');
      },
    });

  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Borrowings',
      path: '/borrowings',
    },
    {
      label: borrowingQuery.data?.data.book.title ?? '',
      path: `/borrowings/${borrowingQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];

  return (
    <Page title="Update Borrowing" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormBorrowing
            key={borrowingQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...borrowingQuery.data?.data,
                borrowed_date: dayjs(borrowingQuery.data?.data.borrowed_date),
                return_date: dayjs(borrowingQuery.data?.data.return_date),
                user_id: borrowingQuery.data?.data.user.id,
                book_id: borrowingQuery.data?.data.book.id,
              },
              disabled: borrowingQuery.isLoading,
            }}
            error={updateBorrowingMutation.error}
            loading={updateBorrowingMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateBorrowingPage;
