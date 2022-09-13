import styles from "../styles/Sign-In.module.css";
import Link from "next/link";
import {MyHead} from "./index";
import {useRouter} from "next/router";
import axios from "axios";

function FormBox({type, name}) {
    return (
        <div className={styles.field_box}>
            <label htmlFor={name} className={styles.form_text}>{name} :</label>
            <input required type={type} id={name} className={styles.form}/>
        </div>
    )
}

function LoginBox() {
    const router = useRouter()

    const validationForm = async (e) => {
        e.preventDefault()

        const username = document.querySelector('#Username').value
        const password = document.querySelector('#Password').value
        const email = document.querySelector('#Email').value
        const city = document.querySelector('#City').value
        const country = document.querySelector('#Country').value

        if (!username || !password || !email || !city || !country) {
            alert('Some fields are missing')
            return false
        }

        return await axios({
            method: 'POST',
            url: 'http://localhost:3000/user',
            data: {
                username: username,
                email: email,
                password: password,
                city: city,
                country: country
            }
        })
            .then(async (res) => {
                window.localStorage.setItem("session", res.data.access_token)
                window.localStorage.setItem("username", username)
                await router.push('/')
                return true
            })
            .catch((e) => {
                alert(e.response.data.message)
            })
    }

    return (
        <div className={styles.login_box}>
            <form onSubmit={validationForm} className={styles.fields}>
                <h2 className={styles.login_text}>Inscription</h2>
                <FormBox type={'text'} name={"Username"}/>
                <FormBox type={'password'} name={"Password"}/>
                <FormBox type={'email'} name={"Email"}/>
                <FormBox type={'text'} name={"City"}/>
                <FormBox type={'text'} name={"Country"}/>
                <button className={styles.login_button}>
                        Inscription
                </button>
            </form>
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