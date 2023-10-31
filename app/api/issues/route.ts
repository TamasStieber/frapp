import { issueSchema } from '@/app/issueSchema';
import prisma from '@/prisma/client';
import { IssueType, Priority } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

// const validateIssueType = (value: any) => {
//   return Object.hasOwn(IssueType, value);
// };

// const validatePriority = (value: any) => {
//   return Object.hasOwn(Priority, value);
// };

// const issueSchema = z.object({
//   projectId: z.number().min(1),
//   title: z.string().min(1).max(255),
//   description: z.string().min(1).max(65535),
//   type: z.custom<IssueType>(validateIssueType),
//   priority: z.custom<Priority>(validatePriority),
//   deadline: z.string().datetime({ offset: true }).optional().nullable(),
// });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, title, description, type, priority, deadline } = body;
  if (!body) return NextResponse.json({ status: 400 });

  const project = await prisma.project.findUnique({ where: { id: projectId } });

  if (!project)
    return NextResponse.json(
      { error: 'Project does not exist!' },
      { status: 400 }
    );

  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      projectId,
      title,
      description,
      type,
      priority,
      deadline,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
