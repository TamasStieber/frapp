import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ProjectDetails from "./ProjectDetails";
import ProjectIssues from "./ProjectIssues";

const ProjectPage = async ({ params }: { params: { url: string } }) => {
  const project = await prisma.project.findUnique({
    where: { url_title: params.url },
    include: { issues: true },
  });

  if (!project) notFound();

  return (
    <Grid columns="1fr 2fr" gap="6" align="start">
      <ProjectDetails project={project} />
      <ProjectIssues issues={project.issues} />
    </Grid>
  );
};

export default ProjectPage;
