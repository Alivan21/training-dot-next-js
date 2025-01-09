'use client';

import { useParams, useRouter } from 'next/navigation';
import { Col, Row, message } from 'antd';
import { Page } from 'admiral';
import dayjs from 'dayjs';

import { FormBook } from '../../_components/form-books';
import { useBookQuery } from '../_hooks/use-book-query';
import { useUpdateBookMutation } from './_hooks/use-update-book-mutation';
import { BookFormData } from '../../_components/form-books/schema';

const UpdateBookPage = () => {
  const params = useParams();
  const router = useRouter();

  const bookId = typeof params.id === 'string' ? params.id : '';

  const bookQuery = useBookQuery(bookId);
  const updateBookMutation = useUpdateBookMutation(bookId);

  const handleOnFinish = (data: BookFormData) =>
    updateBookMutation.mutate(
      { ...data, description: data.description || '' },
      {
        onSuccess: () => {
          router.push('/books');
          message.success('Book berhasil diupdate');
        },
        onError: () => {
          message.error('Book gagal diupdate');
        },
      }
    );

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
      label: bookQuery.data?.data.title ?? '',
      path: `/books/${bookQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];

  return (
    <Page title="Update Book" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormBook
            key={bookQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...bookQuery.data?.data,
                published_date: dayjs(bookQuery.data?.data.published_date),
                author_ids: bookQuery.data?.data.authors.map(
                  (author) => author.id
                ),
                category_ids: bookQuery.data?.data.categories.map(
                  (category) => category.id
                ),
                publisher_id: bookQuery.data?.data.publisher.id,
              },
              disabled: bookQuery.isLoading,
            }}
            error={updateBookMutation.error}
            loading={updateBookMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default UpdateBookPage;
