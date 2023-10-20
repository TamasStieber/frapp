import { Project, ProjectStatus, Stage } from '@prisma/client';
import { Button, Flex, Text, TextArea, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import FormSelect from '../components/FormSelect';
import projectStages from '../projectStages';
import projectStatuses from '../projectStatuses';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../projectSchema';
import { z } from 'zod';
import FormErrorMessage from '../components/FormErrorMessage';

type ProjectForm = z.infer<typeof projectSchema>;

interface Props {
  project?: Project;
  handleClose: () => void;
}

const ProjectForm = ({ project, handleClose }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const createProject = async (data: any) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/projects', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status !== 201) throw new Error();
      const project: Project = await response.json();
      router.push(`/projects/${project.url_title}`);
    } catch (error) {
      setSubmitting(false);
    }
  };

  const updateProject = async (data: any) => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/projects/${project?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status !== 200) throw new Error();
      const updatedProject: Project = await response.json();
      if (updatedProject.url_title === project?.url_title) {
        handleClose();
        router.refresh();
      } else router.push(`/projects/${updatedProject.url_title}`);
    } catch (error) {
      setSubmitting(false);
    }
  };

  const onSubmit = (data: any) => {
    if (project) updateProject(data);
    else createProject(data);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Flex direction='column' gap='3' my='5'>
        <TextField.Root>
          <TextField.Input
            placeholder='Title'
            defaultValue={project?.title}
            {...register('title')}
          />
        </TextField.Root>
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        <TextArea
          placeholder='Description'
          defaultValue={project?.description}
          {...register('description')}
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        <TextField.Root>
          <TextField.Input
            placeholder='Project URL'
            defaultValue={project?.url || undefined}
            {...register('url')}
          />
        </TextField.Root>
        <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
        <TextField.Root>
          <TextField.Input
            placeholder='Git Repository'
            defaultValue={project?.git || undefined}
            {...register('git')}
          />
        </TextField.Root>
        <FormErrorMessage>{errors.git?.message}</FormErrorMessage>
        <Flex gap='2'>
          <Flex direction='column' className='w-1/2'>
            <Text color='gray'>Project Status</Text>
            <Controller
              name='status'
              control={control}
              defaultValue={project?.status || ProjectStatus.NOT_STARTED}
              render={({ field }) => (
                <FormSelect
                  label='Project Status'
                  options={projectStatuses}
                  defaultValue={project?.status || ProjectStatus.NOT_STARTED}
                  onValueChange={field.onChange}
                />
              )}
            />
          </Flex>
          <Flex direction='column' className='w-1/2'>
            <Text color='gray'>Project Stage</Text>
            <Controller
              name='stage'
              control={control}
              defaultValue={project?.stage || Stage.NOT_STARTED}
              render={({ field }) => (
                <FormSelect
                  label='Project Stage'
                  options={projectStages}
                  defaultValue={project?.stage || Stage.NOT_STARTED}
                  onValueChange={field.onChange}
                />
              )}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex justify='end'>
        <Button type={undefined} disabled={isSubmitting}>
          {project ? 'Update' : 'Create'} {isSubmitting && <Spinner />}
        </Button>
      </Flex>
    </form>
  );
};

export default ProjectForm;
