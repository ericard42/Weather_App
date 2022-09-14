import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {Box} from "@mui/material";

function Connexion() {
    return (
        <Box className={styles.login_box}>
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
        </Box>
    )
}

export default Connexion