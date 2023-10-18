import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import _ from "lodash";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
  url: z.string().url().min(1).max(191).optional().nullable(),
  git: z.string().url().min(1).max(191).optional().nullable(),
  deadline: z.string().datetime({ offset: true }).optional().nullable(),
});

export async function GET(request: NextRequest) {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, url, git, deadline } = body;

  if (!body)
    return NextResponse.json({ error: "No data provided!" }, { status: 400 });

  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const existingProject = await prisma.project.findUnique({
    where: { title: title },
  });
  if (existingProject)
    return NextResponse.json(
      { error: "A project with the same name already exists!" },
      { status: 400 }
    );

  const urlTitle = _.kebabCase(title);

  const newProject = await prisma.project.create({
    data: {
      title,
      description,
      url,
      git,
      deadline,
      url_title: urlTitle,
    },
  });

  return NextResponse.json(newProject, { status: 201 });
}
