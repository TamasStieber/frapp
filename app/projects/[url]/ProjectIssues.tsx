import { Issue } from '@prisma/client';
import { Grid, Text } from '@radix-ui/themes';
import IssueCard from './IssueCard';

const ProjectIssues = ({ issues }: { issues: Issue[] }) => {
  if (issues.length === 0)
    return <Text>There are no issues for this project yet.</Text>;

  return (
    <Grid columns='4' width='100%' gap='2'>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </Grid>
  );
};

export default ProjectIssues;
