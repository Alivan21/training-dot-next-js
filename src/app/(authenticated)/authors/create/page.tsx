'use client';

import { Page } from 'admiral';
import { Col, message, Row } from 'antd';
import { FormAuthor } from '../_components/form-authors';
import { useRouter } from 'next/navigation';
import { useCreateAuthorMutation } from './_hooks/use-create-author-mutation';
import { AuthorFormData } from '../_components/form-authors/schema';

const CreateAuthorPage = () => {
  const router = useRouter();
  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Authors',
      path: '/authors',
    },
    {
      label: 'Create Author',
      path: '#',
    },
  ];

  const createAuthorMutation = useCreateAuthorMutation();

  const handleOnFinish = (data: AuthorFormData) =>
    createAuthorMutation.mutate(
      { ...data },
      {
        onSuccess: () => {
          message.success('Author berhasil dibuat');
          router.push('/authors');
        },
        onError: () => {
          message.error('Author gagal dibuat');
        },
      }
    );

  return (
    <Page title="Add Author" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormAuthor
            formProps={{ onFinish: handleOnFinish }}
            error={createAuthorMutation.error}
            loading={createAuthorMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
export default CreateAuthorPage;
