import styles from "../../styles/Home.module.css";
import Link from "next/link";

function Connexion() {
    return (
        <div className={styles.login_box}>
            <Link href={"/login"}>
                <a className={styles.text}>
                    Login
                </a>
            </Link>
            {" or "}
            <Link href={"/inscription"}>
                <a className={styles.text}>
                    Inscription
                </a>
            </Link>
        </div>
    )
}

export default Connexion