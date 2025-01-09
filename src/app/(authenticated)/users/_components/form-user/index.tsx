'use client';

import { Button, DatePicker, Flex, Form, Input, Select, Space } from 'antd';
import { FC } from 'react';
import { FormProps } from 'antd/lib';
import { UserFormSchema } from './schema';
import { useFormErrorHandling } from '@/hooks/form/use-form-error-handling';
import { createZodSync } from '@/utils/zod-sync';
import { TResponseError } from '@/common/types/response';
import { useBorrowingOptionQuery } from './use-borrowing-option-query';
import { AxiosError } from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { MinusCircleOutlined } from '@ant-design/icons';

type Props = {
  formProps: FormProps;
  loading: boolean;
  error: AxiosError<TResponseError> | null;
};

const rule = createZodSync(UserFormSchema);

export const FormUser: FC<Props> = ({ formProps, error, loading }) => {
  const [form] = Form.useForm();

  useFormErrorHandling(form, error);

  const borrowingOptionQuery = useBorrowingOptionQuery();

  return (
    <Form
      {...formProps}
      form={form}
      layout="vertical"
      initialValues={{
        phone_numbers: [''],
      }}
    >
      <Form.Item label="Name" name="name" rules={[rule]}>
        <Input placeholder="Fredrick" />
      </Form.Item>
      <Form.Item label="email" name="email" rules={[rule]}>
        <Input type="email" placeholder="johndoe@gmail.com" />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[rule]}>
        <Input type="password" placeholder="Tulis password anda" />
      </Form.Item>
      <Form.Item label="Membership Date" name="membership_date" rules={[rule]}>
        <DatePicker placeholder="Tanggal Lahir" />
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[rule]}>
        <Select
          placeholder="Choose Status"
          options={[
            {
              label: 'Active',
              value: 'Active',
            },
            {
              label: 'Inactive',
              value: 'Inactive',
            },
          ]}
        />
      </Form.Item>
      <Form.List name="phone_numbers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Flex
                style={{
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
                key={key}
              >
                <Form.Item
                  {...restField}
                  name={[name]}
                  rules={[rule]}
                  label={name === 0 ? 'Phone Numbers' : ''}
                  style={{ flex: 1, marginBottom: 0, width: '100%' }}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
                {index > 0 && (
                  <Form.Item style={{ marginBottom: 0, marginLeft: 8 }}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Form.Item>
                )}
              </Flex>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Phone Number
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item label="Borrowings" name="borrowing_ids" rules={[rule]}>
        <Select
          placeholder="Choose borrowings"
          options={borrowingOptionQuery.data}
          loading={borrowingOptionQuery.isLoading}
          mode="multiple"
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
