import prisma from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from '../components/Link';
import ProjectStageBadge from '../components/ProjectStageBadge';
import ProjectStatusBadge from '../components/ProjectStatusBadge';
import { formatDateTime } from '../utilities';
import ProjectDialog from './ProjectDialog';

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany();
  return (
    <>
      <ProjectDialog>
        <Button>New Project</Button>
      </ProjectDialog>
      <Table.Root variant='surface' mt='5'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Stage</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Deadline</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>
                <Link href={`/projects/${project.url_title}`}>
                  {project.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <ProjectStatusBadge status={project.status} />
              </Table.Cell>
              <Table.Cell>
                <ProjectStageBadge stage={project.stage} />
              </Table.Cell>
              <Table.Cell>{formatDateTime(project.deadline)}</Table.Cell>
              <Table.Cell>{formatDateTime(project.createdAt)}</Table.Cell>
              <Table.Cell>{formatDateTime(project.updatedAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default ProjectsPage;
