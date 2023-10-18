import { ProjectStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import projectStatuses from "../projectStatuses";

const ProjectStatusBadge = ({ status }: { status: ProjectStatus }) => {
  const projectStatus = projectStatuses[status];
  return <Badge color={projectStatus.color}>{projectStatus.label}</Badge>;
};

export default ProjectStatusBadge;
