import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import _ from 'lodash';
import { projectSchema } from '../../projectSchema';

export async function GET(request: NextRequest) {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description, url, git, deadline, status, stage } = body;

  if (!body)
    return NextResponse.json({ error: 'No data provided!' }, { status: 400 });

  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const existingProject = await prisma.project.findUnique({
    where: { title: title },
  });
  if (existingProject)
    return NextResponse.json(
      { error: 'A project with the same name already exists!' },
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
      status,
      stage,
    },
  });

  return NextResponse.json(newProject, { status: 201 });
}
