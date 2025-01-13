'use client';

import { TResponseError } from '@/common/types/response';
import { createZodSync } from '@/utils/zod-sync';
import { Button, DatePicker, Form, FormProps, Input, Row, Col } from 'antd';
import { AxiosError } from 'axios';
import { AuthorFormSchema } from './schema';
import { FC } from 'react';
import { useFormErrorHandling } from '@/app/_hooks/form/use-form-error-handling';
const { TextArea } = Input;

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(AuthorFormSchema);

export const FormAuthor: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useFormErrorHandling(form, error);

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item required label="Name" name="name" rules={[rule]}>
            <Input placeholder="Author's name" />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item
            required
            label="Birth Date"
            name="birthdate"
            rules={[rule]}
          >
            <DatePicker
              placeholder="Select birth date"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item required label="Biography" name="biography" rules={[rule]}>
        <TextArea rows={4} placeholder="Author's biography" />
      </Form.Item>

      <Form.Item required label="Nationality" name="nationality" rules={[rule]}>
        <Input placeholder="Author's nationality" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
