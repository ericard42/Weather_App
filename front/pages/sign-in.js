import Link from "next/link";
import Head from "next/head";
import {MyHead} from "./index";
import styles from '../styles/Sign-In.module.css'

function LoginBox() {
    return (
        <div className={styles.login_box}>
            <div className={styles.fields}>
                <h2 className={styles.login_text}>Login</h2>
                <div className={styles.field_box}>
                    <h4 className={styles.form_text}>Email :</h4>
                    <input type={"email"} id={"password"} className={styles.form}/>
                </div>
                     <div className={styles.field_box}>
                     <h4 className={styles.form_text}>Password :</h4>
                <input type={"password"} id={"password"} className={styles.form}/>
                </div>
                <Link href={"/"}>
                    <a>
                        <p className={styles.login_button}>
                            Login
                         </p>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default function SignIn() {
    return (
        <>
            <MyHead title={"Login"}/>
            <main className={styles.main}>
                <LoginBox/>
            </main>
        </>
    )
}