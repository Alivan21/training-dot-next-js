'use client';
import { useParams } from 'next/navigation';
import { useBookQuery } from './_hooks/use-book-query';
import { Page, Section } from 'admiral';
import Descriptions from 'admiral/descriptions';
import { Col, Row, Tag } from 'antd';
import { formatToIndonesianDate } from '@/utils/format-date';

const DetailBookPage = () => {
  const params = useParams();
  const bookId = typeof params.id === 'string' ? params.id : '';
  const bookQuery = useBookQuery(bookId);

  const breadcrumbs = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'User',
      path: '/users',
    },
    {
      label: bookQuery.data?.data.title ?? '',
      path: `/users/${bookQuery.data?.data.id}`,
    },
  ];

  return (
    <Page title="Detail Book" breadcrumbs={breadcrumbs} noStyle>
      <Section loading={bookQuery.isLoading} title="Book Information">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                {bookQuery.data?.data.title}
              </Descriptions.Item>
              <Descriptions.Item label="ISBN">
                {bookQuery.data?.data.isbn}
              </Descriptions.Item>
              <Descriptions.Item label="Published Date">
                {formatToIndonesianDate(
                  bookQuery.data?.data.published_date ?? ''
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Language">
                {bookQuery.data?.data.language}
              </Descriptions.Item>
              <Descriptions.Item label="Page Count">
                {bookQuery.data?.data.page_count}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col xs={24} lg={12}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Quantity">
                {bookQuery.data?.data.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Publisher">
                {bookQuery.data?.data.publisher.name}
              </Descriptions.Item>
              <Descriptions.Item label="Authors">
                {bookQuery.data?.data.authors.map((author) => (
                  <Tag key={author.id}>{author.name}</Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Categories">
                {bookQuery.data?.data.categories.map((category) => (
                  <Tag key={category.id}>{category.name}</Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={24}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Description">
                {bookQuery.data?.data.description || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Section>
    </Page>
  );
};
export default DetailBookPage;
