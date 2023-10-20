import prisma from '@/prisma/client';
import { Button, Flex, Grid, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ProjectDetails from './ProjectDetails';
import ProjectIssues from './ProjectIssues';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const ProjectPage = async ({ params }: { params: { url: string } }) => {
  const project = await prisma.project.findUnique({
    where: { url_title: params.url },
    include: { issues: true },
  });

  if (!project) notFound();

  return (
    <Grid columns='1fr 2fr' gap='6' align='start'>
      <ProjectDetails project={project} />
      <Flex direction='column'>
        <Flex justify='between' mb='3'>
          <Heading>Issues</Heading>
          <Button size='1' color='green'>
            {' '}
            <AiOutlinePlusCircle /> New Issue
          </Button>
        </Flex>
        <ProjectIssues issues={project.issues} />
      </Flex>
    </Grid>
  );
};

export default ProjectPage;
