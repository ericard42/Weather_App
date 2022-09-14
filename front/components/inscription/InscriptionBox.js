import {useRouter} from "next/router";
import axios from "axios";
import styles from "../../styles/Sign-In.module.css";
import FormBox from "../global/FormBox";
import {postUser} from "../../queries/user";

function InscriptionBox() {
    const router = useRouter()

    const validationForm = async (e) => {
        e.preventDefault()

        const data = {
         username: document.querySelector('#Username').value,
         password: document.querySelector('#Password').value,
         email: document.querySelector('#Email').value,
         city: document.querySelector('#City').value,
         country: document.querySelector('#Country').value
        }
        if (!data.username || !data.password || !data.email || !data.city || !data.country) {
            alert('Some fields are missing')
            return false
        }

        await postUser(data)
            .then(async (res) => {
                window.localStorage.setItem("session", res.access_token)
                window.localStorage.setItem("username", data.username)
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

export default InscriptionBox