'use client';

import { useParams } from 'next/navigation';
import { useAuthorQuery } from './_hooks/use-author-query';
import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { formatToIndonesianDate } from '@/utils/format-date';

const DetailAuthorPage = () => {
  const params = useParams();
  const authorId = typeof params.id === 'string' ? params.id : '';
  const { data, isLoading } = useAuthorQuery(authorId);
  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Author',
      path: '/authors',
    },
    {
      label: data?.data.name ?? '',
      path: `/authors/${data?.data.id}`,
    },
  ];
  return (
    <Page title="Detail User" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={isLoading} title="Detail User">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Name">
            {data?.data.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Birthdate">
            {formatToIndonesianDate(data?.data.birthdate ?? '-')}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Biography">
            {data?.data.biography}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Nationality">
            {data?.data.nationality}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailAuthorPage;
