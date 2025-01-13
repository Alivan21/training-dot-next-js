import dayjs from 'dayjs';
import { z } from 'zod';

export const BorrowingFromSchema = z.object({
  user_id: z
    .string()
    .min(1, { message: 'Required' })
    .or(z.number({ required_error: 'Required' })),
  book_id: z
    .string()
    .min(1, { message: 'Required' })
    .or(z.number({ required_error: 'Required' })),
  borrowed_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  return_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  status: z.string(),
});

export type BorrowingFormData = z.infer<typeof BorrowingFromSchema>;
