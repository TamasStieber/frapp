'use client';

import { Dialog, Button, Flex } from '@radix-ui/themes';
import ProjectForm from './ProjectForm';
import { useState } from 'react';

const CreateProject = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>New Project</Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>Create New Project</Dialog.Title>
          <Dialog.Description>
            Please fill the form with the project details.
          </Dialog.Description>
          <ProjectForm handleClose={handleClose} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default CreateProject;
