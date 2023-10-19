'use client';

import { Dialog, Button } from '@radix-ui/themes';
import ProjectForm from './ProjectForm';

const CreateProject = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button type={undefined}>New Project</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create New Project</Dialog.Title>
        <Dialog.Description>
          Please fill the form with the project details.
        </Dialog.Description>
        <ProjectForm />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateProject;
