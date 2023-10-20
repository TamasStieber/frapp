'use client';

import { Dialog, Button } from '@radix-ui/themes';
import ProjectForm from './ProjectForm';
import { Project } from '@prisma/client';
import { ReactNode, useState } from 'react';
import React from 'react';

interface Props {
  project?: Project;
  children: ReactNode;
}

const ProjectDialog = ({ project, children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const prompt = project ? 'Edit' : 'Create New';

  let correctedChild;

  React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === 'button') {
      const button = child as React.ReactElement<{ type: string }>;
      correctedChild = React.cloneElement(button, { type: undefined });
    }
    return child;
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{correctedChild}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{`${prompt} Project`}</Dialog.Title>
        <Dialog.Description>
          Please fill the form with the project details.
        </Dialog.Description>
        <ProjectForm project={project} handleClose={handleClose} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectDialog;
