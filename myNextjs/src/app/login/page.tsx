"use client";
import Link from "next/link";
import styles from './styles.module.css'
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [uname, setuname] = useState('');
  const [pwd, setpwd] = useState('');
  const handleLogin = ()=>{
    if(uname==='') return
    login({
      username: uname,
      role: uname
    });
    redirect('/')
  }
  const { login } = useAuthStore();
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className={styles.formWrapper}>
        <div>
          <label className={styles.formLabel}>Name</label>
          <input
            className={styles.formInput}
            value={uname}
            onChange={e => setuname(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor="pwd">Password</label>
          <input
            className={styles.formInput}
            value={pwd}
            onChange={e => setpwd(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.formLabel}></label>
          <button className={styles.submitBtn} onClick={() => handleLogin()}>Sign In</button>
        </div>
      </div>
      <div className="mt-4 text-center text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}