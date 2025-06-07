import Link from "next/link";
import styles from './styles.module.css'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form className={styles.formWrapper}>
        <div>
          <label className={styles.formLabel} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor="pwd">Password</label>
          <input
            type="password"
            id="pwd"
            className={styles.formInput}
          />
        </div>
        <div>
          <label className={styles.formLabel}></label>
          <button
            type="submit"
            className={styles.submitBtn}
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}