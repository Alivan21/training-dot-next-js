'use client';

import { TResponseError } from '@/common/types/response';
import { createZodSync } from '@/utils/zod-sync';
import { Button, DatePicker, Form, FormProps, Select, Row, Col } from 'antd';
import { AxiosError } from 'axios';
import { BorrowingFromSchema } from './schema';
import { FC } from 'react';
import { useFormErrorHandling } from '@/app/_hooks/form/use-form-error-handling';
import { useUserOptionQuery } from './use-user-option-query';
import { useBookOptionQuery } from './use-book-option-query';

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(BorrowingFromSchema);

export const FormBorrowing: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useFormErrorHandling(form, error);

  const userOptionQuery = useUserOptionQuery();
  const bookOptionQuery = useBookOptionQuery();

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item label="User" name="user_id" rules={[rule]}>
            <Select
              placeholder="Select user"
              options={userOptionQuery.data}
              loading={userOptionQuery.isLoading}
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Book" name="book_id" rules={[rule]}>
            <Select
              placeholder="Select book"
              options={bookOptionQuery.data}
              loading={bookOptionQuery.isLoading}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <Form.Item label="Borrowed Date" name="borrowed_date" rules={[rule]}>
            <DatePicker
              placeholder="Select borrow date"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item label="Return Date" name="return_date" rules={[rule]}>
            <DatePicker
              placeholder="Select return date"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Status" name="status" rules={[rule]}>
        <Select
          placeholder="Select status"
          options={[
            { value: 'Borrowed', label: 'Borrowed' },
            { value: 'Returned', label: 'Returned' },
            { value: 'Overdue', label: 'Overdue' },
          ]}
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
