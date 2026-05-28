import React from "react";
import { HouseIcon, FileTextIcon } from "@phosphor-icons/react";

export interface NavLinkItem {
  label: string;
  link: string;
  requiresAuth?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
}

export const navLinks: NavLinkItem[] = [
  {
    label: "Home",
    link: "/",
    Icon: HouseIcon,
  },
  {
    label: "ATS Scanner",
    link: "/analyze",
    Icon: FileTextIcon,
  },
  // {
  //   label: "private",
  //   link: "/private",
  //   requiresAuth: true,
  // },
];
