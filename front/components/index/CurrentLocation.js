import styles from "../../styles/Home.module.css";
import Image from "next/image";

function CurrentLocation({city, country, weather, precipitation}) {
    return (
        <div className={styles.location}>
            <h1>{city} - {country}</h1>
            <div className={styles.info_location}>
                <Image width={"50px"} height={"50px"} src={"/icons/cloud.png"}/>
                <div className={styles.temperature}>
                    {weather}°C <br/>
                    {precipitation}%
                </div>
            </div>
        </div>
    )
}

export default CurrentLocation