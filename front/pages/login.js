import MyTitle from "../components/global/MyTitle";
import MyHead from "../components/global/MyHead";
import styles from '../styles/Sign-In.module.css'
import LoginBox from "../components/login/LoginBox";

export default function Login() {
    return (
        <div>
            <MyHead title={"Login"}/>
            <main className={styles.main}>
                <MyTitle/>
                <LoginBox/>
            </main>
        </div>
    )
}