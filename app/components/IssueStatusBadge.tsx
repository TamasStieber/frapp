import { IssueStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import issueStatuses from "../issueStatuses";

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
  const issueStatus = issueStatuses[status];
  return <Badge color={issueStatus.color}>{issueStatus.label}</Badge>;
};

export default IssueStatusBadge;
