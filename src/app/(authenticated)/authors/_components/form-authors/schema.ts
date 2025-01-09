import dayjs from 'dayjs';
import { z } from 'zod';

export const AuthorFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  birthdate: z.instanceof(dayjs as any, { message: 'Invalid date' }),
  biography: z.string().min(1, { message: 'Required' }),
  nationality: z.string().min(1, { message: 'Required' }),
});

export type AuthorFormData = z.infer<typeof AuthorFormSchema>;
