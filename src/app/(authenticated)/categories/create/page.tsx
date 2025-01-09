'use client';

import { useRouter } from 'next/navigation';
import { useCreateCategoryMutation } from './_hooks/use-create-category-mutation';
import { CategoryFormData } from '../_components/form-category/schema';
import { Col, message, Row } from 'antd';
import { FormCategory } from '../_components/form-category';
import { Page } from 'admiral';

const CreateCategoryPage = () => {
  const router = useRouter();
  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Category',
      path: '/categories',
    },
    {
      label: 'Create Category',
      path: '#',
    },
  ];

  const createCategoryMutation = useCreateCategoryMutation();

  const handleOnFinish = (data: CategoryFormData) =>
    createCategoryMutation.mutate(
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
    <Page title="Add Category" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormCategory
            formProps={{ onFinish: handleOnFinish }}
            error={createCategoryMutation.error}
            loading={createCategoryMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
export default CreateCategoryPage;
