'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCategoryQuery } from '../_hooks/use-category-query';
import { useUpdateCategoryMutation } from './_hooks/use-update-category-mutation';
import { TCreateCategoryRequest } from '@/api/category';
import { Col, message, Row } from 'antd';
import { Page } from 'admiral';
import { FormCategory } from '../../_components/form-category';

const UpdateCategoryPage = () => {
  const params = useParams();
  const router = useRouter();

  const categoryId = typeof params.id === 'string' ? params.id : '';

  const CategoryQuery = useCategoryQuery(categoryId);

  const updateCategoryMutation = useUpdateCategoryMutation(categoryId);

  const handleOnFinish = (data: TCreateCategoryRequest) =>
    updateCategoryMutation.mutate(data, {
      onSuccess: () => {
        router.push('/categories');
        message.success('Category berhasil diupdate');
      },
      onError: () => {
        message.error('Category gagal diupdate');
      },
    });

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
      label: CategoryQuery.data?.data.name ?? '',
      path: `/categories/${CategoryQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];
  return (
    <Page title="Update Category" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormCategory
            key={CategoryQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...CategoryQuery.data?.data,
              },
              disabled: CategoryQuery.isLoading,
            }}
            error={updateCategoryMutation.error}
            loading={updateCategoryMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
export default UpdateCategoryPage;
