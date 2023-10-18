import { Issue } from "@prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import IssueCard from "./IssueCard";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ProjectIssues = ({ issues }: { issues: Issue[] }) => {
  if (issues.length === 0)
    return <Text>There are no issues for this project yet.</Text>;

  return (
    <Flex direction="column">
      <Flex justify="between" mb="3">
        <Heading>Issues</Heading>
        <Button size="1" color="green">
          {" "}
          <AiOutlinePlusCircle /> New Issue
        </Button>
      </Flex>
      <Grid columns="4" width="100%" gap="2">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </Grid>
    </Flex>
  );
};

export default ProjectIssues;
