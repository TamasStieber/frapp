import { RadixColor } from "@prisma/client";
import { IconType } from "react-icons";
import { AiOutlineBug, AiOutlineStar } from "react-icons/ai";
import { HiOutlineSparkles } from "react-icons/hi2";
import { GoTasklist } from "react-icons/go";

type IssueType = {
  label: string;
  color: RadixColor;
  icon: IconType;
};

const issueTypes: { [key: string]: IssueType } = {
  BUG: {
    label: "Bug",
    color: "red",
    icon: AiOutlineBug,
  },
  IMPROVEMENT: {
    label: "Improvement",
    color: "amber",
    icon: HiOutlineSparkles,
  },
  NEW_FEATURE: {
    label: "New Feature",
    color: "green",
    icon: AiOutlineStar,
  },
  TASK: {
    label: "Task",
    color: "purple",
    icon: GoTasklist,
  },
};

export default issueTypes;
