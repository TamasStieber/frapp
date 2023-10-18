import { RadixColor } from "@prisma/client";

type ProjectStatus = {
  label: string;
  color: RadixColor;
};

const projectStatuses: { [key: string]: ProjectStatus } = {
  NOT_STARTED: {
    label: "Not Started",
    color: "gray",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "amber",
  },
  DONE: {
    label: "Done",
    color: "green",
  },
  DELETED: {
    label: "Deleted",
    color: "red",
  },
};

export default projectStatuses;
