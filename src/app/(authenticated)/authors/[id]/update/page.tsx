import { Page } from 'admiral';
import { Col, message, Row } from 'antd';
import { FormAuthor } from '../../_components/form-authors';
import { useParams, useRouter } from 'next/navigation';
import { useAuthorQuery } from '../_hooks/use-author-query';
import { useUpdateAuthorMutation } from './_hooks/use-update-author-mutation';
import { TCreateAuthorRequest } from '@/api/author';

const UpdateAuthorPage = () => {
  const params = useParams();
  const router = useRouter();

  const authorId = typeof params.id === 'string' ? params.id : '';

  const authorQuery = useAuthorQuery(authorId);

  const updateAuthorMutation = useUpdateAuthorMutation(authorId);

  const handleOnFinish = (data: TCreateAuthorRequest) =>
    updateAuthorMutation.mutate(data, {
      onSuccess: () => {
        router.push('/authors');
        message.success('Author berhasil diupdate');
      },
      onError: () => {
        message.error('Author gagal diupdate');
      },
    });

  const breadcrumb = [
    {
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      label: 'Author',
      path: '/authors',
    },
    {
      label: authorQuery.data?.data.name ?? '',
      path: `/authors/${authorQuery.data?.data.id}`,
    },
    {
      label: 'Update',
      path: '#',
    },
  ];
  return (
    <Page title="Update Author" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: 'auto' }}>
          <FormAuthor
            key={authorQuery.data?.data.id}
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                ...authorQuery.data?.data,
              },
              disabled: authorQuery.isLoading,
            }}
            error={updateAuthorMutation.error}
            loading={updateAuthorMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};
export default UpdateAuthorPage;
