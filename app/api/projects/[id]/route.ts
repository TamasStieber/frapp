import { projectSchema } from '@/app/projectSchema';
import prisma from '@/prisma/client';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: 'Invalid ID!' }, { status: 400 });

  const project = await prisma.project.findUnique({
    where: { id: id },
    include: { issues: true },
  });
  if (!project)
    return NextResponse.json(
      { error: 'Project does not exist!' },
      { status: 404 }
    );

  return NextResponse.json(project, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: 'Invalid ID!' }, { status: 400 });

  const project = await prisma.project.findUnique({
    where: { id: id },
    include: { issues: true },
  });
  if (!project)
    return NextResponse.json(
      { error: 'Project does not exist!' },
      { status: 404 }
    );

  const deletedProject = await prisma.project.delete({ where: { id: id } });

  return NextResponse.json(deletedProject, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { title, description, url, git, deadline, status, stage } = body;

  const validation = projectSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: 'Invalid ID!' }, { status: 400 });

  const project = await prisma.project.findUnique({
    where: { id: id },
    include: { issues: true },
  });
  if (!project)
    return NextResponse.json(
      { error: 'Project does not exist!' },
      { status: 404 }
    );

  const urlTitle = _.kebabCase(title);

  const updatedProject = await prisma.project.update({
    where: { id: id },
    data: {
      title,
      description,
      url,
      git,
      url_title: urlTitle,
      deadline,
      status,
      stage,
    },
  });

  return NextResponse.json(updatedProject, { status: 200 });
}
