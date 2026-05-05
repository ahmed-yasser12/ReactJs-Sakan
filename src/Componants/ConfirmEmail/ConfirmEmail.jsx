import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import success from "../../images/success.png";

export default function ConfirmEmail() {

    const { token } = useParams();

    const [status, setStatus] = useState("loading"); // loading | success | error

    useEffect(() => {
        async function verifyEmail() {
            try {
                await axios.get(`https://your-api.com/auth/confirm-email/${token}`);
                setStatus("success");
            } catch (err) {
                setStatus("error");
            }
        }

        verifyEmail();
    }, [token]);

    if (status === "loading") {
        return <h2 className="text-center mt-5">Verifying...</h2>;
    }

    if (status === "error") {
        return <h2 className="text-center mt-5 text-danger">Invalid or expired link</h2>;
    }

    return (
        <div className={styles.container}>
            <img src={success} alt="success" className={styles.success_img} />
            <h1>Email verified successfully</h1>

            <Link to="/login">
                <button className={styles.green_btn}>Login</button>
            </Link>
        </div>
    );
}