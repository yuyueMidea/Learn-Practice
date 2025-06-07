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
    title: "首页",
    path: "/",
    requiresAuth: false,
  },
  {
    title: "看板",
    path: "/dashboard",
    requiresAuth: true,
  },
  {
    title: "商品管理",
    path: "/goods",
    requiresAuth: false,
  },
  {
    title: "post管理",
    path: "/postList",
    requiresAuth: false,
  },
  {
    title: "待办事项",
    path: "/taskList",
    requiresAuth: false,
  },
];

export type MenuVariant = "horizontal" | "vertical";