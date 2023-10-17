type ProjectStage = {
  label: string;
  color:
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "brown"
    | "orange"
    | "sky"
    | "mint"
    | "lime"
    | "yellow"
    | "amber"
    | "gold"
    | "bronze"
    | "gray";
};

const projectStages: { [key: string]: ProjectStage } = {
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
    color: "ruby",
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
    color: "grass",
  },
};

export default projectStages;
