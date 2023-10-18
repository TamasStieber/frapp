import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

const FormErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text size='2' color='red' as='p'>
      {children}
    </Text>
  );
};

export default FormErrorMessage;
