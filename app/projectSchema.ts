import z from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535),
  status: z.string().min(1).max(255),
  stage: z.string().min(1).max(255),
  url: z
    .string()
    .url('Invalid URL')
    .min(1)
    .max(191)
    .optional()
    .nullable()
    .or(z.literal('')),
  git: z
    .string()
    .url('Invalid URL')
    .min(1)
    .max(191)
    .optional()
    .nullable()
    .or(z.literal('')),
  deadline: z.string().datetime({ offset: true }).optional().nullable(),
});
