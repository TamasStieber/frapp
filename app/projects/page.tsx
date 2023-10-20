import React from 'react';
import ProjectDialog from './ProjectDialog';
import { Button } from '@radix-ui/themes';

const ProjectsPage = () => {
  return (
    <ProjectDialog>
      <Button>New Project</Button>
    </ProjectDialog>
  );
};

export default ProjectsPage;
