import {useRouter} from "next/router";
import {authUser} from "../../queries/user";
import styles from "../../styles/Sign-In.module.css";
import FormBox from "../global/FormBox";

function LoginBox() {
    let router = useRouter()

    const validationForm = async (e) => {
        e.preventDefault()

        const name = document.querySelector('#Username').value
        const password = document.querySelector('#Password').value

        if (!name || !password) {
            alert('Please enter your username and your password.')
            return false
        }

        await authUser(name, password)
            .then(async (res) => {
                window.localStorage.setItem("session", res.access_token)
                window.localStorage.setItem("username", name)
                await router.push('/')
                return true
            })
            .catch((e) => {
                console.log(e)
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

export default LoginBox