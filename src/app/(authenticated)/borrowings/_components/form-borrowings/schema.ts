import dayjs from 'dayjs';
import { z } from 'zod';

export const BorrowingFromSchema = z.object({
  user_id: z.string().min(1, { message: 'Required' }),
  book_id: z.string().min(1, { message: 'Required' }),
  borrowed_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  return_date: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  status: z.string(),
});
