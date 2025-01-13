import { z } from 'zod';

export const CategoryFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  parentCategory_id: z.number().optional(),
  subcategories: z.array(z.number(), { required_error: 'Required' }).optional(),
});

export type CategoryFormData = z.infer<typeof CategoryFormSchema>;
