import Link from "next/link";
import {MyHead, MyTitle} from "./index";
import styles from '../styles/Sign-In.module.css'
import axios from "axios";
import {Router, useRouter} from "next/router";

function FormBox({type, name}) {
    return (
        <div className={styles.field_box}>
            <label htmlFor={name} className={styles.form_text}>{name} :</label>
            <input required type={type} id={name} name={name} className={styles.form}/>
        </div>
    )
}

function LoginBox() {
    let router = useRouter()

    const validationForm = async (e) => {
        e.preventDefault()

        const name = document.querySelector('#Username').value
        const password = document.querySelector('#Password').value

        console.log(name)
        console.log(password)

        if (!name || !password) {
            alert('Please enter your username and your password.')
            return false
        }

        return await axios({
            method: 'POST',
            url: "http://localhost:3000/auth",
            data: {
                username: name,
                password: password
            }
        })
            .then(async (res) => {
                console.log(res)
                window.localStorage.setItem("session", res.data.access_token)
                window.localStorage.setItem("username", name)
                await router.push('/')
                return true
            })
            .catch((e) => {
                alert("User doesn't exist. Please verify you username and password.")
                return false
            })
    }


    return (
        <div className={styles.login_box}>
            <form onSubmit={validationForm} className={styles.fields}>
                <h2 className={styles.login_text}>Login</h2>
                <FormBox type={'text'} name={"Username"}/>
                <FormBox type={'password'} name={"Password"}/>
                <button className={styles.login_button}>Login</button>
            </form>
        </div>
    )
}

export default function Login() {
    return (
        <>
            <MyHead title={"Login"}/>
            <main className={styles.main}>
                <MyTitle/>
                <LoginBox/>
            </main>
        </>
    )
}