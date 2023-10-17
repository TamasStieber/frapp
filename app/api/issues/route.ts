import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body) return NextResponse.json({ status: 400 });

  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      project: body.project,
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
