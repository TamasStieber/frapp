import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, IssueType, Priority } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { issueSchema } from '../issueSchema';
import z from 'zod';
import { Flex, TextField, TextArea, Button, Text } from '@radix-ui/themes';
import FormErrorMessage from '../components/FormErrorMessage';
import FormSelect from '../components/FormSelect';
import Spinner from '../components/Spinner';
import issueTypes from '../issueTypes';
import priorities from '../priorities';

type IssueForm = z.infer<typeof issueSchema>;

interface Props {
  projectId: number;
  issue?: Issue;
  handleClose: () => void;
}

const IssueForm = ({ projectId, issue, handleClose }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const createIssue = async (data: any) => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/issues', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status !== 201) throw new Error();
      closeAndRefresh();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const updateIssue = async (data: any) => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/issues/${issue?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status !== 200) throw new Error();
      closeAndRefresh();
    } catch (error) {
      setSubmitting(false);
    }
  };

  const closeAndRefresh = () => {
    handleClose();
    router.refresh();
  };

  const onSubmit = (data: any) => {
    data.projectId = projectId;
    if (issue) updateIssue(data);
    else createIssue(data);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Flex direction='column' gap='3' my='5'>
        <TextField.Root>
          <TextField.Input
            placeholder='Title'
            defaultValue={issue?.title}
            {...register('title')}
          />
        </TextField.Root>
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        <TextArea
          placeholder='Description'
          defaultValue={issue?.description}
          {...register('description')}
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        <Flex gap='2'>
          <Flex direction='column' className='w-1/2'>
            <Text color='gray'>Issue Type</Text>
            <Controller
              name='type'
              control={control}
              defaultValue={issue?.type || IssueType.BUG}
              render={({ field }) => (
                <FormSelect
                  label='Issue Type'
                  options={issueTypes}
                  defaultValue={issue?.type || IssueType.BUG}
                  onValueChange={field.onChange}
                />
              )}
            />
          </Flex>
          <Flex direction='column' className='w-1/2'>
            <Text color='gray'>Priority</Text>
            <Controller
              name='priority'
              control={control}
              defaultValue={issue?.priority || Priority.MEDIUM}
              render={({ field }) => (
                <FormSelect
                  label='Issue Priority'
                  options={priorities}
                  defaultValue={issue?.priority || Priority.MEDIUM}
                  onValueChange={field.onChange}
                />
              )}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex justify='end'>
        <Button type={undefined} disabled={isSubmitting}>
          {issue ? 'Update' : 'Create'} {isSubmitting && <Spinner />}
        </Button>
      </Flex>
    </form>
  );
};

export default IssueForm;
