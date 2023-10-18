import { Stage } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import projectStages from "../projectStages";

const ProjectStageBadge = ({ stage }: { stage: Stage }) => {
  const projectStage = projectStages[stage];
  return <Badge color={projectStage.color}>{projectStage.label}</Badge>;
};

export default ProjectStageBadge;
