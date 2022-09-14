import styles from "../../styles/Home.module.css";

function MyTitle() {
    return ( <div className={styles.title}>
            <h1>Weather App</h1>
            <p>by <a href={"https://github.com/ericard42"}>ericard</a></p>
        </div>
    )
}

export default MyTitle