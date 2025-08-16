"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../../types/navigation";
import styles from "./styles.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar_aside}>
      <ul className={styles.sidebarMenu}>
        {NAV_ITEMS.filter((item) => !item.requiresAuth).map((item) => (
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
