import axios from "axios";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import {useState} from "react";
import {deleteFavorite} from "../../queries/favorite";

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
        <div className={styles.favorite_box}>
            <h3>Favorites</h3>
            { tab.length > 0 &&
                <div className={styles.favorite_loc}>
                    <button onClick={prevFav}>
                        <Image width={"30px"} height={"30px"} src={"/icons/arrow-left.png"}/>
                    </button>
                    <div className={styles.favorite_info}>
                        {tab[index].city}<br/>
                        {tab[index].country}<br/>
                        {tab[index].weather}°C<br/>
                        {tab[index].rain}%<br/>
                        {index + 1} / {tab.length}<br/>
                        <button onClick={removeFav}>
                            <Image width={"20px"} height={"20px"} src={"/icons/star-in-fav.png"}/>
                        </button>
                    </div>
                    <button onClick={nextFav}>
                        <Image width={"30px"} height={"30px"} src={"/icons/arrow-right.png"}/>
                    </button>
                </div>
            }
        </div>
    )
}

export default Favorites