import ProjectStageBadge from '@/app/components/ProjectStageBadge';
import ProjectStatusBadge from '@/app/components/ProjectStatusBadge';
import { Project } from '@prisma/client';
import { Heading, Flex, Text, Grid } from '@radix-ui/themes';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import ProjectActions from './ProjectActions';
import { formatDateTime } from '@/app/utilities';

const ProjectDetails = ({ project }: { project: Project }) => {
  return (
    <Flex direction='column'>
      <Flex justify='between' mb='3'>
        <Heading>{project.title}</Heading>
        <ProjectActions project={project} />
      </Flex>
      <Flex justify='between' mb='3'>
        <ProjectStatusBadge status={project.status} />
        <ProjectStageBadge stage={project.stage} />
      </Flex>
      <Flex direction='column' gap='1' mb='5'>
        <ProjectDetailsGrid>
          <ProjectDetailsText>Created at:</ProjectDetailsText>
          <ProjectDetailsText>
            {formatDateTime(project.createdAt)}
          </ProjectDetailsText>
        </ProjectDetailsGrid>
        <ProjectDetailsGrid>
          <ProjectDetailsText>Updated at:</ProjectDetailsText>
          <ProjectDetailsText>
            {formatDateTime(project.updatedAt)}
          </ProjectDetailsText>
        </ProjectDetailsGrid>
        <ProjectDetailsGrid>
          <ProjectDetailsText>Deadline:</ProjectDetailsText>
          {project.deadline && (
            <ProjectDetailsText>
              {formatDateTime(project.deadline)}
            </ProjectDetailsText>
          )}
        </ProjectDetailsGrid>
        <ProjectDetailsGrid>
          <ProjectDetailsText>Project URL:</ProjectDetailsText>
          {project.url && (
            <ProjectDetailsText>
              <Link
                target='_blank'
                className='text-green-600 hover:underline'
                href={project.url}
              >
                {project.url}
              </Link>
            </ProjectDetailsText>
          )}
        </ProjectDetailsGrid>
        <ProjectDetailsGrid>
          <ProjectDetailsText>Git Repository:</ProjectDetailsText>
          {project.git && (
            <ProjectDetailsText>
              <Link
                target='_blank'
                className='text-green-600 hover:underline'
                href={project.git}
              >
                {project.git}
              </Link>
            </ProjectDetailsText>
          )}
        </ProjectDetailsGrid>
      </Flex>
      <Flex direction='column' mb='5'>
        <ProjectDetailsText>Description:</ProjectDetailsText>
        <ProjectDetailsText>{project.description}</ProjectDetailsText>
      </Flex>
      <Flex direction='column'>
        <ProjectDetailsText>Comment:</ProjectDetailsText>
        {project.comment && (
          <ProjectDetailsText>{project.comment}</ProjectDetailsText>
        )}
      </Flex>
    </Flex>
  );
};

const ProjectDetailsText = ({ children }: PropsWithChildren) => {
  return <Text size='2'>{children}</Text>;
};

const ProjectDetailsGrid = ({ children }: PropsWithChildren) => {
  return <Grid columns='1fr 3fr'>{children}</Grid>;
};

export default ProjectDetails;
