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

const ProjectForm = ({ handleClose }: { handleClose: () => void }) => {
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

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/projects', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status !== 201) throw new Error();
      const project: Project = await response.json();
      handleClose();
      router.push(`/projects/${project.url_title}`);
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Flex direction='column' gap='3' my='5'>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        <TextArea placeholder='Description' {...register('description')} />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        <TextField.Root>
          <TextField.Input placeholder='Project URL' {...register('url')} />
        </TextField.Root>
        <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
        <TextField.Root>
          <TextField.Input placeholder='Git Repository' {...register('git')} />
        </TextField.Root>
        <FormErrorMessage>{errors.git?.message}</FormErrorMessage>
        <Flex gap='2'>
          <Flex direction='column' className='w-1/2'>
            <Text color='gray'>Project Status</Text>
            <Controller
              name='status'
              control={control}
              defaultValue={ProjectStatus.NOT_STARTED}
              render={({ field }) => (
                <FormSelect
                  label='Project Status'
                  options={projectStatuses}
                  defaultValue={ProjectStatus.NOT_STARTED}
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
              defaultValue={Stage.NOT_STARTED}
              render={({ field }) => (
                <FormSelect
                  label='Project Stage'
                  options={projectStages}
                  defaultValue={Stage.NOT_STARTED}
                  onValueChange={field.onChange}
                />
              )}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex justify='end'>
        <Button type={undefined} disabled={isSubmitting}>
          {'Create'} {isSubmitting && <Spinner />}
        </Button>
      </Flex>
    </form>
  );
};

export default ProjectForm;
