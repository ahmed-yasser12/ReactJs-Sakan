import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import failure from "../../images/false-2061132_640.webp";

export default function ConfirmEmailError() {
  return (
    <div className={styles.container}>
      <img src={failure} alt="verification failed" className="w-25" />

      <h1>Email verification failed</h1>

      <p className="text-muted mt-2">
        The link may be invalid, expired, or already used.
      </p>

      <div className="mt-4 d-flex gap-3 justify-content-center">
        <Link to="/register">
          <button className={styles.secondary_btn}>Register Again</button>
        </Link>

        <Link to="/login">
          <button className={styles.green_btn}>Go to Login</button>
        </Link>
      </div>
    </div>
  );
}
