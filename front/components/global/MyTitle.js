import styles from "../../styles/Home.module.css";
import {Box, Typography} from "@mui/material";

function MyTitle() {
    return (
        <Box className={styles.title}>
            <Typography component={"div"} variant={"h2"}>
                Weather App
            </Typography>
            <Typography component={"div"} variant={"body1"}>
                by <a href={"https://github.com/ericard42"}>
                    ericard
                </a>
            </Typography>
        </Box>
    )
}

export default MyTitle