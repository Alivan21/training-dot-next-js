'use client';
import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { Tag } from 'antd';
import { useParams } from 'next/navigation';
import { useCategoryQuery } from './_hooks/use-category-query';

const DetailCategoryPage = () => {
  const params = useParams();
  const categoryId = typeof params.id === 'string' ? params.id : '';
  const categoryQuery = useCategoryQuery(categoryId);

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Category',
      path: '/categories',
    },
    {
      label: categoryQuery.data?.data.name ?? '',
      path: `/categories/${categoryQuery.data?.data.id}`,
    },
  ];
  return (
    <Page title="Detail Category" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={categoryQuery.isLoading} title="Detail Category">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {categoryQuery.data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Description">
            {categoryQuery.data?.data.description}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Sub Category">
            {categoryQuery.data?.data.subcategories.map((category) => (
              <Tag key={category.id}>{category.name}</Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};
export default DetailCategoryPage;
