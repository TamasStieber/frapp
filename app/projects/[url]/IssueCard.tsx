import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import IssueTypeBadge from "@/app/components/IssueTypeBadge";
import Link from "@/app/components/Link";
import PriorityBadge from "@/app/components/PriorityBadge";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";

const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <Card variant="classic">
      <Flex align="start" justify="between">
        <Flex wrap="nowrap" className="overflow-hidden overflow w-10/12">
          <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
        </Flex>
        <PriorityBadge priority={issue.priority} />
      </Flex>
      <Flex direction="row" justify="between" align="center" py="2">
        <IssueStatusBadge status={issue.status} />
        <IssueTypeBadge type={issue.type} />
      </Flex>
      <Box>
        <Text size="2">{issue.description}</Text>
      </Box>
    </Card>
  );
};

export default IssueCard;
