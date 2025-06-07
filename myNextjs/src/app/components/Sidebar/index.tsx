"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "../../types/navigation";
import styles from "./styles.module.css";

interface SidebarProps {
  items: NavItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          {items.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`${styles.link} ${
                  pathname === item.path ? styles.active : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}