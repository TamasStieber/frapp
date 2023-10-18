import {
  ProjectStatus,
  Stage,
  IssueStatus,
  IssueType,
  Priority,
} from '@prisma/client';
import { Select } from '@radix-ui/themes';
import issueStatuses from '../issueStatuses';
import issueTypes from '../issueTypes';
import priorities from '../priorities';
import projectStages from '../projectStages';
import projectStatuses from '../projectStatuses';

interface Props {
  label: string;
  options:
    | typeof projectStatuses
    | typeof projectStages
    | typeof issueStatuses
    | typeof issueTypes
    | typeof priorities;
  defaultValue: ProjectStatus | Stage | IssueStatus | IssueType | Priority;
  onValueChange: () => void;
}

const FormSelect = ({ label, options, defaultValue, onValueChange }: Props) => {
  type Option = {
    value: string;
    label: string;
  };

  const optionsArray: Option[] = [];

  for (const option in options) {
    optionsArray.push({
      value: option,
      label: options[option].label,
    });
  }

  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>{label}</Select.Label>
          {optionsArray.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default FormSelect;
