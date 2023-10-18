import { IssueType } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import issueTypes from "../issueTypes";

const IssueTypeBadge = ({ type }: { type: IssueType }) => {
  const issueType = issueTypes[type];
  return (
    <Badge color={issueType.color}>
      <issueType.icon />
      {issueType.label}
    </Badge>
  );
};

export default IssueTypeBadge;
