import {useRouter} from "next/router";
import styles from "../../styles/Home.module.css";
import {Box, Button, Typography} from "@mui/material";

function Welcome({username}) {
    const router = useRouter()

    const disconnect = (e) => {
        window.localStorage.clear()
        router.reload()
        return true
    }

    return (
        <Box className={styles.welcome}>
            <Typography component={"p"} variant={"h4"}>Welcome {username} !</Typography>
            <Button variant={"contained"} onClick={disconnect}>Disconnect</Button>
        </Box>

    )
}

export default Welcome