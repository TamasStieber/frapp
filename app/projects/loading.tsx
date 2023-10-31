import { Flex } from '@radix-ui/themes';
import BeatLoader from 'react-spinners/BeatLoader';

const Loading = () => {
  return (
    <Flex justify='center' align='center' py='8'>
      <BeatLoader
        color='green'
        loading
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </Flex>
  );
};

export default Loading;
