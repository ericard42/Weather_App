import styles from "../../styles/Home.module.css";
import Image from "next/image";
import {Box, Paper} from "@mui/material";

function CurrentLocation({city, country, weather, precipitation}) {
    return (
        <Paper elevation={6} className={styles.location}>
            <h1>{city} - {country}</h1>
            <Box className={styles.info_location}>
                <Image width={"50px"} height={"50px"} src={"/icons/cloud.png"}/>
                <Box className={styles.temperature}>
                    {weather}°C <br/>
                    {precipitation}%
                </Box>
            </Box>
        </Paper>
    )
}

export default CurrentLocation