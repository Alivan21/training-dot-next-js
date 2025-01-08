import { z } from 'zod';

export const AuthorFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  birthdate: z.string().min(1, { message: 'Required' }),
  biography: z.string().min(1, { message: 'Required' }),
  nationality: z.string().min(1, { message: 'Required' }),
});

export type AuthorFormData = z.infer<typeof AuthorFormSchema>;
