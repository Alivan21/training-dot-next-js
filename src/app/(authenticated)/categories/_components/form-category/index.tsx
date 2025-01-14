import { TResponseError } from '@/common/types/response';
import { createZodSync } from '@/utils/zod-sync';
import { Button, Form, FormProps, Input, Row, Col, Select } from 'antd';
import { AxiosError } from 'axios';
import { CategoryFormSchema } from './schema';
import { FC } from 'react';
import { useFormErrorHandling } from '@/app/_hooks/form/use-form-error-handling';
import { useCategoryOptionQuery } from './use-subcategory-option-query';
const { TextArea } = Input;

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(CategoryFormSchema);

export const FormCategory: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();
  useFormErrorHandling(form, error);

  const categoryOptionQuery = useCategoryOptionQuery();
  console.log(categoryOptionQuery.data);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item required label="Name" name="name" rules={[rule]}>
            <Input placeholder="Category name" />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item
            label="Parent Category"
            name="parentCategory_id"
            rules={[rule]}
          >
            <Input placeholder="Select parent category" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item required label="Description" name="description" rules={[rule]}>
        <TextArea rows={4} placeholder="Category description" />
      </Form.Item>

      <Form.Item label="Subcategories" name="subcategories" rules={[rule]}>
        <Select
          placeholder="Choose subcategories"
          mode="multiple"
          options={categoryOptionQuery.data}
          loading={categoryOptionQuery.isLoading}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
