import axios from "axios";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import {useState} from "react";
import {deleteFavorite} from "../../queries/favorite";
import {Box, Button, Paper, Typography} from "@mui/material";

function Favorites({tab, handleDelete, username, token}) {
    const [index, setIndex] = useState(0)

    const prevFav = () => {
        if (index - 1 >= 0)
            setIndex(index - 1)
    }

    const nextFav = () => {
        if (index + 1 < tab.length)
            setIndex(index + 1)
    }

    const removeFav = async () => {
        await deleteFavorite(username, tab, token, index)
            .then(() => {
                handleDelete(index)
                setIndex(0)
            })
            .catch((e) => {
                throw e
            })
    }

    return (
        <Box className={styles.favorite_box}>
            <Typography variant={"h5"} component={"div"}>Favorites</Typography>
            { tab.length > 0 &&
                <Box className={styles.favorite_loc}>
                    <Button variant={"outlined"} onClick={prevFav}>
                        <Image width={"30px"} height={"30px"} src={"/icons/arrow-left.png"}/>
                    </Button>
                    <Box className={styles.favorite_info}>
                        {tab[index].city}<br/>
                        {tab[index].country}<br/>
                        {tab[index].weather}°C<br/>
                        {tab[index].rain}%<br/>
                        {index + 1} / {tab.length}<br/>
                        <Button variant={"outlined"} onClick={removeFav}>
                            <Image width={"20px"} height={"20px"} src={"/icons/star-in-fav.png"}/>
                        </Button>
                    </Box>
                    <Button variant={"outlined"} onClick={nextFav}>
                        <Image width={"30px"} height={"30px"} src={"/icons/arrow-right.png"}/>
                    </Button>
                </Box>
            }
        </Box>
    )
}

export default Favorites