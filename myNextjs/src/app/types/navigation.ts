import { ReactNode } from "react";

export interface NavItem {
  title: string;
  path: string;
  icon?: ReactNode;
  children?: NavItem[];
  requiresAuth?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    path: "/",
    requiresAuth: false,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    requiresAuth: true,
  },
  {
    title: "About",
    path: "/about",
    requiresAuth: false,
  },
  {
    title: "Contact",
    path: "/contact",
    requiresAuth: false,
  },
];

export type MenuVariant = "horizontal" | "vertical";