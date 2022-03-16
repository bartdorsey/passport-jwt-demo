import useLoginForm from "./useLoginForm.js"
import useAuth from "../AuthProvider/useAuth.js";
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { isLoggedIn, authenticating } = useAuth();
  const {
    username,
    password,
    error,
    handleSubmit,
    updateUsername,
    updatePassword,
  } = useLoginForm();

  if (isLoggedIn || authenticating) {
    return null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error ? <div className={styles.error}>{error}</div> : null}
      <input
        type="text"
        name="username"
        onChange={updateUsername}
        value={username}
      />
      <input
        type="password"
        name="password"
        onChange={updatePassword}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  )
}
