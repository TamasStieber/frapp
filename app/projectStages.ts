import { RadixColor } from "@prisma/client";

type ProjectStage = {
  label: string;
  color: RadixColor;
};

const projectStages: { [key: string]: ProjectStage } = {
  NOT_STARTED: {
    label: "Not Started",
    color: "gray",
  },
  PLANNING: {
    label: "Planning",
    color: "amber",
  },
  DESIGNING: {
    label: "Designing",
    color: "tomato",
  },
  IN_DEVELOPMENT: {
    label: "In Development",
    color: "violet",
  },
  OPTIMIZATION: {
    label: "Optimization",
    color: "pink",
  },
  REFACTORING: {
    label: "Refactoring",
    color: "purple",
  },
  DEBUGGING: {
    label: "Debugging",
    color: "iris",
  },
  TESTING: {
    label: "Testing",
    color: "teal",
  },
  IN_PRODUCTION: {
    label: "In Production",
    color: "green",
  },
};

export default projectStages;
