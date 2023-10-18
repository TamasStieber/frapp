import { Priority } from "@prisma/client";
import React from "react";
import priorities from "../priorities";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { AiFillAccountBook } from "react-icons/ai";

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const issuePriority = priorities[priority];
  return (
    <Tooltip content={issuePriority.label}>
      <IconButton
        radius="full"
        variant="soft"
        size="1"
        color={issuePriority.color}
      >
        <issuePriority.icon />
      </IconButton>
    </Tooltip>
  );
};

export default PriorityBadge;
