'use client';

import { useParams } from 'next/navigation';
import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { useBorrowingQuery } from './_hooks/use-borrowing-query';
import { formatToIndonesianDate } from '@/utils/format-date';

const DetailBorrowingPage = () => {
  const params = useParams();
  const borrowingId = typeof params.id === 'string' ? params.id : '';
  const borrowingQuery = useBorrowingQuery(borrowingId);

  const breadcrumbs = [
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
  ];

  return (
    <Page title="Detail Borrowing" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={borrowingQuery.isLoading} title="Detail Borrowing">
        <Descriptions bordered column={2}>
          <Descriptions.Item span={2} label="Book Title">
            {borrowingQuery.data?.data.book.title}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="User">
            {borrowingQuery.data?.data.user.name}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Borrowed Date">
            {formatToIndonesianDate(
              borrowingQuery.data?.data.borrowed_date ?? '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Return Date">
            {formatToIndonesianDate(
              borrowingQuery.data?.data.return_date ?? '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Status">
            {borrowingQuery.data?.data.status}
          </Descriptions.Item>
        </Descriptions>
      </Section>
    </Page>
  );
};

export default DetailBorrowingPage;
