import z from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535),
  type: z.string().min(1).max(255),
  priority: z.string().min(1).max(255),
  deadline: z.string().datetime({ offset: true }).optional().nullable(),
});

// export const issueSchema = z.object({
//     projectId: z.number().min(1),
//     title: z.string().min(1).max(255),
//     description: z.string().min(1).max(65535),
//     type: z.custom<IssueType>(validateIssueType),
//     priority: z.custom<Priority>(validatePriority),
//     deadline: z.string().datetime({ offset: true }).optional().nullable(),
//   });
