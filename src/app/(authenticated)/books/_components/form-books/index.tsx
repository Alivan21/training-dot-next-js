'use client';

import { TResponseError } from '@/common/types/response';
import { createZodSync } from '@/utils/zod-sync';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Row,
  Select,
} from 'antd';
import { AxiosError } from 'axios';
import { BookFormSchema } from './schema';
import { FC } from 'react';
import { useFormErrorHandling } from '@/app/_hooks/form/use-form-error-handling';
import { useCategoryOptionQuery } from './use-category-option-query';
import { usePublisherOptionQuery } from './use-publisher-option-query';
import { useAuthorOptionQuery } from './use-author-option-query';
const { TextArea } = Input;

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(BookFormSchema);

export const FormBook: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useFormErrorHandling(form, error);

  const authorOptionQuery = useAuthorOptionQuery();
  const publisherOptionQuery = usePublisherOptionQuery();
  const categoryOptionQuery = useCategoryOptionQuery();

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item label="Title" name="title" rules={[rule]}>
            <Input placeholder="Fredrick" />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="ISBN" name="isbn" rules={[rule]}>
            <Input type="text" placeholder="isbn" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item label="Quantity" name="quantity" rules={[rule]}>
            <Input type="number" placeholder="0" />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item
            label="Published Date"
            name="published_date"
            rules={[rule]}
          >
            <DatePicker
              placeholder="Tanggal Publish"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Deskripsi" name="description" rules={[rule]}>
        <TextArea rows={4} placeholder="description" />
      </Form.Item>

      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item label="Author" name="author_id" rules={[rule]}>
            <Select
              placeholder="Choose author"
              options={authorOptionQuery.data}
              loading={authorOptionQuery.isLoading}
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Publisher" name="publisher_id" rules={[rule]}>
            <Select
              placeholder="Choose publisher"
              options={publisherOptionQuery.data}
              loading={publisherOptionQuery.isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Kategori" name="category_ids" rules={[rule]}>
        <Select
          placeholder="Choose category"
          options={categoryOptionQuery.data}
          loading={categoryOptionQuery.isLoading}
          mode="multiple"
        />
      </Form.Item>

      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item label="Total Halaman" name="page_count" rules={[rule]}>
            <Input type="number" placeholder="0" />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Bahasa" name="language" rules={[rule]}>
            <Input type="text" placeholder="Indonesia" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
