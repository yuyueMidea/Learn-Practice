"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../../types/navigation";
import styles from "./styles.module.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>Next.js Demo---yy3</div>
        <ul className={styles.menu}>
          {NAV_ITEMS.filter((item) => !item.requiresAuth).map((item) => (
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
      </div>
    </nav>
  );
}