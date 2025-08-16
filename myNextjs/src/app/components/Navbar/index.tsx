"use client";

import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>Next.js Demo --- yy3</div>
        {/* 这里可以放用户信息，比如头像/用户名 */}
        <div className={styles.userInfo}>Hello, User</div>
      </div>
    </nav>
  );
}
