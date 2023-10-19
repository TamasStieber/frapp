import { Project } from '@prisma/client';
import { Button, Flex } from '@radix-ui/themes';
import { AiOutlineEdit, AiOutlineCloseCircle } from 'react-icons/ai';
import DeleteProject from './DeleteProject';

const ProjectActions = ({ project }: { project: Project }) => {
  return (
    <Flex gap='2'>
      <Button size='1' color='cyan'>
        <AiOutlineEdit /> Edit Project
      </Button>
      <DeleteProject project={project} />
    </Flex>
  );
};

export default ProjectActions;
