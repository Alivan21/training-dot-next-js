'use client';

import { useRouter } from 'next/navigation';
import { Col, message, Row } from 'antd';
import { Page } from 'admiral';
import { FormBorrowing } from '../_components/form-borrowings';
import { BorrowingFormData } from '../_components/form-borrowings/schema';
import { useCreateBorrowingMutation } from './_hooks/use-create-borrowing-mutation';

const CreateBorrowingPage = () => {
  const router = useRouter();
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
      label: 'Create Borrowing',
      path: '#',
    },
  ];

  const createBorrowingMutation = useCreateBorrowingMutation();

  const handleOnFinish = (data: BorrowingFormData) =>
    createBorrowingMutation.mutate(
      {
        user_id: Number(data.user_id),
        book_id: Number(data.book_id),
        borrowed_date: data.borrowed_date.format('YYYY-MM-DD'),
        return_date: data.return_date.format('YYYY-MM-DD'),
        status: data.status,
      },
      {
        onSuccess: () => {
          message.success('Borrowing berhasil dibuat');
          router.push('/borrowings');
        },
        onError: () => {
          message.error('Borrowing gagal dibuat');
        },
      }
    );

  return (
    <Page title="Add Borrowing" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormBorrowing
            formProps={{ onFinish: handleOnFinish }}
            error={createBorrowingMutation.error}
            loading={createBorrowingMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default CreateBorrowingPage;
