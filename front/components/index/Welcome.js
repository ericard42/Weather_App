import {useRouter} from "next/router";
import styles from "../../styles/Home.module.css";

function Welcome({username}) {
    const router = useRouter()

    const disconnect = (e) => {
        window.localStorage.clear()
        router.reload()
        return true
    }

    return (
        <div className={styles.welcome}>
            <p>Welcome {username} !</p>
            <button onClick={disconnect} className={styles.text}>Disconnect</button>
        </div>

    )
}

export default Welcome