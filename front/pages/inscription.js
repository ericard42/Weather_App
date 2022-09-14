import styles from "../styles/Sign-In.module.css";
import MyTitle from "../components/global/MyTitle";
import MyHead from "../components/global/MyHead";
import InscriptionBox from "../components/inscription/InscriptionBox";

export default function Inscription() {
    return (
        <div>
            <MyHead title={"Inscription"}/>
            <main className={styles.main}>
                <MyTitle/>
                <InscriptionBox/>
            </main>
        </div>
    )
}