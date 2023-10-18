import { RadixColor } from "@prisma/client";
import { IconType } from "react-icons";
import {
  LuChevronDown,
  LuEqual,
  LuChevronUp,
  LuChevronsUp,
} from "react-icons/lu";

type Priority = {
  label: string;
  color: RadixColor;
  icon: IconType;
};

const priorities: { [key: string]: Priority } = {
  LOW: {
    label: "Low",
    color: "sky",
    icon: LuChevronDown,
  },
  MEDIUM: {
    label: "Medium",
    color: "violet",
    icon: LuEqual,
  },
  HIGH: {
    label: "High",
    color: "amber",
    icon: LuChevronUp,
  },
  EXCLUSIVE: {
    label: "Exclusive",
    color: "crimson",
    icon: LuChevronsUp,
  },
};

export default priorities;
