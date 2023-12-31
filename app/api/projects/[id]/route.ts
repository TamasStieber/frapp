import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid ID!" }, { status: 400 });

  const project = await prisma.project.findUnique({
    where: { id: id },
    include: { issues: true },
  });
  if (!project)
    return NextResponse.json(
      { error: "Project does not exist!" },
      { status: 400 }
    );

  return NextResponse.json(project, { status: 200 });
}
