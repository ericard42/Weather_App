import styles from "../styles/Sign-In.module.css";
import Link from "next/link";
import {MyHead} from "./index";

function FormBox({type, name}) {
    return (
        <div className={styles.field_box}>
            <h4 className={styles.form_text}>{name} :</h4>
            <input type={type} id={type} className={styles.form}/>
        </div>
    )
}

function LoginBox() {
    return (
        <div className={styles.login_box}>
            <div className={styles.fields}>
                <h2 className={styles.login_text}>Inscription</h2>
                <FormBox type={'text'} name={"Username"}/>
                <FormBox type={'password'} name={"Password"}/>
                <FormBox type={'email'} name={"Email"}/>
                <FormBox type={'text'} name={"City"}/>
                <FormBox type={'text'} name={"Country"}/>
                <Link href={"/"}>
                    <a><p className={styles.login_button}>
                        Inscription
                    </p></a>
                </Link>
            </div>
        </div>
    )
}

export default function Inscription() {
    return (
        <>
            <MyHead title={"Inscription"}/>
            <main className={styles.main}>
                <LoginBox/>
            </main>
        </>
    )
}