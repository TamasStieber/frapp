'use client';

import { Issue } from '@prisma/client';
import { Dialog } from '@radix-ui/themes';
import React, { ReactNode, useState } from 'react';
import IssueForm from './IssueForm';

interface Props {
  projectId: number;
  issue?: Issue;
  children: ReactNode;
}

const IssueDialog = ({ projectId, issue, children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const prompt = issue ? 'Edit' : 'Create New';

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
        <Dialog.Title>{`${prompt} Issue`}</Dialog.Title>
        <Dialog.Description>
          Please fill the form with the issue details.
        </Dialog.Description>
        <IssueForm
          projectId={projectId}
          issue={issue}
          handleClose={handleClose}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default IssueDialog;
