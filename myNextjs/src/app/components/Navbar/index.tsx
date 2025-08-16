"use client";

import useAuthStore from "@/app/store/authStore";
import styles from "./styles.module.css";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated ,currentUser, logout } = useAuthStore();
  const handleLogout = ()=>{
    logout();
    setTimeout(() => {
      redirect('/login')
    }, 500);
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>Next.js Demo --- yy3</div>
        {/* 这里可以放用户信息，比如头像/用户名 */}
        {isAuthenticated &&
          <div className={styles.userInfo}>
            <span>Hello, {currentUser.username}</span>
            <button className={styles.logout} onClick={handleLogout}>退出</button>
          </div>}
        
      </div>
    </nav>
  );
}
