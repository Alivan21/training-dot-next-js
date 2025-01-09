'use client';

import { useRouter } from 'next/navigation';
import { useCreateBookMutation } from './_hooks/use-create-book-mutation';
import { Col, message, Row } from 'antd';
import { BookFormData } from '../_components/form-books/schema';
import { Page } from 'admiral';
import { FormBook } from '../_components/form-books';

const CreateBookPage = () => {
  const router = useRouter();
  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Books',
      path: '/books',
    },
    {
      label: 'Create Book',
      path: '#',
    },
  ];
  const createBookMutation = useCreateBookMutation();

  const handleOnFinish = (data: BookFormData) =>
    createBookMutation.mutate(
      {
        ...data,
        description: data.description || '',
        published_date: data.published_date || new Date(),
      },
      {
        onSuccess: () => {
          message.success('Book berhasil dibuat');
          router.push('/books');
        },
        onError: () => {
          message.error('Book gagal dibuat');
        },
      }
    );

  return (
    <Page title="Add Book" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormBook
            formProps={{ onFinish: handleOnFinish }}
            error={createBookMutation.error}
            loading={createBookMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
export default CreateBookPage;
