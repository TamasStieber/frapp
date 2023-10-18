import { RadixColor } from "@prisma/client";

type IssueStatus = {
  label: string;
  color: RadixColor;
};

const issueStatuses: { [key: string]: IssueStatus } = {
  OPEN: {
    label: "Open",
    color: "red",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "amber",
  },
  BLOCKED: {
    label: "Blocked",
    color: "ruby",
  },
  WONT_DO: {
    label: "Won't Do",
    color: "purple",
  },
  DONE: {
    label: "Done",
    color: "green",
  },
};

export default issueStatuses;
