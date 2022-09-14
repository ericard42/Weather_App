import axios from "axios";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import {useEffect, useState} from "react";
import {deleteFavorite, postFavorite} from "../../queries/favorite";
import {postLocation} from "../../queries/location";
import {Box, Button, Paper, TextField} from "@mui/material";

function FavButtons({addFav, removeFav, fav}) {
    return (
        <Box>
            {fav === false ?
                <Button variant={"outlined"} onClick={addFav}>
                    <Image width={"20px"} height={"20px"} src={"/icons/star.png"}/>
                </Button>
                :
                <Button onClick={removeFav}>
                    <Image width={"20px"} height={"20px"} src={"/icons/star-in-fav.png"}/>
                </Button>
            }
        </Box>
    )
}

function Search({handleFav, username, token, tab, handleDelete}) {
    const [fav, setFav] = useState(false)
    const [search, setSearch] = useState("")
    const [err, setErr] = useState([false, false])

    useEffect(() => {
        isFav(search.city, search.country)
    }, [tab])

    const searchLocation = async (e) => {
        let city = document.querySelector('#city').value
        let country = document.querySelector('#country').value

        let error = [false, false]

        if (!city)
            error[0] = true
        if (!country)
            error[1] = true
        if (!country || !city) {
            setErr(error)
            return false
        }

        setErr([false, false])

        e.preventDefault()
        await postLocation(city, country)
            .then ((res) => {
                setSearch(res)
                isFav(city, country)
            })
            .catch(() => {
                alert('Location not found')
            })
    }

    const removeFav = async () => {
        let i = 0
        for (i; tab[i]; i++) {
            if (tab[i].city === search.city && tab[i].country === search.country)
                break
        }
        if (i < 0 || i > tab.length)
            return ;

        await deleteFavorite(username, tab, token, i)
            .then(() => {
                handleDelete(i)
                setFav(false)
            })
            .catch((e) => {
                throw e
            })
    }

    const isFav = (city, country) => {
        if (tab) {
            for (let i = 0; tab[i]; i++) {
                if (tab[i].city === city && tab[i].country === country) {
                    setFav(true)
                    return true
                }
            }
        }
        setFav(false)
        return false
    }

    const addFav = async (e) => {
        const location = {
            city: search.city,
            country: search.country,
            weather: search.weather,
            rain: search.rain
        }
        await postFavorite(location, username, token)
            .then(() => {
                handleFav(location)
                setFav(true)
            })
            .catch((e) => {
                throw e
            })
    }

    return (
        <Paper className={styles.search_box}>
            <Box component={"form"} autoComplete={"off"} className={styles.content_search} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                <TextField error={err[0]} required label={"City"} id={"city"}/>
                <TextField error={err[1]} required label={"Country"} id={"country"}/>
                <Button onClick={searchLocation} className={styles.button_search}>Search</Button>
            </Box>

            {/*<form onSubmit={searchLocation} className={styles.content_search}>*/}
            {/*    /!*<label htmlFor={"city"}>City :</label>*!/*/}
            {/*    /!*<input required type={'text'} id={"city"} name={"city"}/>*!/*/}
            {/*    /!*<label htmlFor={"country"}>Country :</label>*!/*/}
            {/*    /!*<input required type={'text'} id={"country"} name={"country"}/>*!/*/}
            {/*    /!*<button className={styles.button_search}>Search</button>*!/*/}
            {/*</form>*/}
            { search !== "" && (
                <Paper elevation={6} className={styles.temperature}>
                    {search.city}<br/>
                    {search.country}<br/>
                    {search.weather}°C<br/>
                    {search.rain}%<br/>
                    { username !== "" &&(
                        <FavButtons addFav={addFav} removeFav={removeFav} fav={fav}/>
                    )}
                </Paper>
            )}
        </Paper>
    )
}

export default Search