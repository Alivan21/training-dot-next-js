import dayjs from 'dayjs';
import { z } from 'zod';

export const BookFormSchema = z.object({
  title: z.string().min(1, 'Required'),
  author_ids: z.array(z.number()).min(1, 'Required'),
  isbn: z.string().min(1, 'Required'),
  published_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  quantity: z
    .number({ required_error: 'Required' })
    .or(z.string().min(1, { message: 'Required' })),
  category_ids: z.array(z.number()).min(1, 'Required'),
  publisher_id: z.number().min(1, 'Required'),
  description: z.string().optional(),
  page_count: z
    .number({ required_error: 'Required' })
    .or(z.string().min(1, { message: 'Required' })),
  language: z.string().min(1, 'Required'),
});

export type BookFormData = z.infer<typeof BookFormSchema>;
