'use client';

import Spinner from '@/app/components/Spinner';
import { Project } from '@prisma/client';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const DeleteProject = ({ project }: { project: Project }) => {
  const [disabled, setDisabled] = useState(true);
  const [isDeleting, setDeleting] = useState(false);

  const router = useRouter();

  const validateProjectName = (event: ChangeEvent<HTMLInputElement>) => {
    const isValid = event.target.value === project.title;
    if (isValid) setDisabled(false);
    else if (!isValid && !disabled) setDisabled(true);
  };

  const deleteProject = async () => {
    try {
      setDeleting(true);
      const response = await fetch(`/api/projects/${project.id}`, {
        method: 'delete',
      });
      if (response.status !== 200) throw new Error();
      router.push('/projects');
    } catch (error) {
      setDeleting(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button type={undefined} size='1' color='red'>
          <AiOutlineCloseCircle /> Delete Project
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title color='red'>Delete Project</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete{' '}
          <Text weight='bold'>{project.title}</Text>?
          <Text color='amber' as='p'>
            This action cannot be undone!
          </Text>
          <Text as='p'>
            Deleting this project will also delete all related issues!
          </Text>
        </Dialog.Description>
        <Flex direction='column' mt='4' gap='2'>
          <Text as='p'>
            To delete this project, type in{' '}
            <Text weight='bold' color='red'>
              {project.title}
            </Text>{' '}
            below:
          </Text>
          <TextField.Root>
            <TextField.Input onChange={validateProjectName} />
          </TextField.Root>
        </Flex>
        <Flex justify='end' gap='2' mt='4'>
          <Dialog.Close>
            <Button type={undefined} variant='outline' color='gray'>
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            type={undefined}
            color='red'
            disabled={disabled || isDeleting}
            onClick={deleteProject}
          >
            {'Delete'} {isDeleting && <Spinner />}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteProject;
