"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../../types/navigation";
import styles from "./styles.module.css";
import useAuthStore from "@/app/store/authStore";

export default function Sidebar() {
  const pathname = usePathname();
  const { isAuthenticated ,currentUser, logout } = useAuthStore();

  return (
    <aside className={styles.sidebar_aside}>
      <ul className={styles.sidebarMenu}>
        {NAV_ITEMS.filter((item) => (isAuthenticated || !item.requiresAuth)).map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`${styles.sidebarLink} ${
                pathname === item.path ? styles.active : ""
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
