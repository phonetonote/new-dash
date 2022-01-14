import * as React from "react";
import { IoCalendar, IoGrid, IoHelpBuoy } from "react-icons/io5";
import { MdWeb } from "react-icons/md";
import {
  FiMessageCircle,
  FiMonitor,
  FiLayers,
  FiZap,
  FiPhoneForwarded,
  FiBook,
  FiBookOpen,
} from "react-icons/fi";

export interface Link {
  label: string;
  href?: string;
  children?: Array<{
    label: string;
    description?: string;
    href: string;
    icon?: React.ReactElement;
  }>;
}

export const links: Link[] = [
  {
    label: "product",
    href: "#",
    children: [
      {
        label: "how it works",
        description: "learn about quick capture as a service and basic usage",
        href: "#",
        icon: <FiMessageCircle />,
      },
      {
        label: "features",
        description: "power up your notes with date and link parsing",
        href: "#",
        icon: <FiLayers />,
      },
      {
        label: "clients",
        description: "sync your notes to logseq, roam and craft",
        href: "#",
        icon: <FiMonitor />,
      },
    ],
  },
  {
    label: "resources",
    href: "#",
    children: [
      {
        label: "workflows",
        description:
          "learn about advanced mobile workflows for iOS and android",
        href: "#",
        icon: <FiPhoneForwarded />,
      },
      {
        label: "integrations",
        description:
          "use zapier, rss and json to input other data into your tools for thought",
        href: "#",
        icon: <FiZap />,
      },
    ],
  },
  {
    label: "updates",
    href: "#",
    children: [
      {
        label: "changelog",
        description: "read about our latest releases",
        href: "#",
        icon: <FiBook />,
      },
      {
        label: "blog",
        description: "articles about tools for thought and phonetonote itself",
        href: "#",
        icon: <FiBookOpen />,
      },
    ],
  },
  { label: "pricing", href: "#" },
];
