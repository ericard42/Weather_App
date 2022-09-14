import MyHead from "../components/global/MyHead";
import MyTitle from "../components/global/MyTitle";
import Connexion from "../components/index/Connexion";
import Welcome from "../components/index/Welcome";
import Favorites from "../components/index/Favorites";
import CurrentLocation from "../components/index/CurrentLocation";
import Search from "../components/index/Search";
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import {getFavorite} from "../queries/favorite";
import {getTemp} from "../queries/location";
import {getUser} from "../queries/user";
import {Box, Paper} from "@mui/material";



export default function Home() {
    const [name, setName] = useState("")
    const [cur_loc, setCurLoc] = useState({})
    const [curFav, setCurFav] = useState({})
    const [token, setToken] = useState("")
    let username = ""
    let tmpToken = ""


    const getFavorites = async () => {
        await getFavorite(username, tmpToken)
            .then((res) => {
                if (res.isFavorite) {
                    setCurFav(res)
                }
            })
            .catch((e) => {
                throw e
            })
    }

    const getWeather = async (city, country) => {
        await getTemp(city, country)
            .then((res) => {
                setCurLoc({
                    city: city,
                    country: country,
                    weather: res.weather,
                    precipitation: res.rain
                })
            })
            .catch((e) => {
                throw e
            })
    }

    const checkUser = async () => {
        return await getUser(username, tmpToken)
            .then(async (response) => {
                await getWeather(response.location.city, response.location.country)
                await getFavorites(name);
                return true
            })
            .catch((e) => {
                window.localStorage.clear()
                window.location.reload()
                throw e
            })
    }

    const handleAdd = (location) => {
        let tab = []
        if (location) {
            if (curFav.isFavorite)
                tab = curFav.Favorites.map(a => {return {...a}})
            tab.push(location)
            setCurFav({isFavorite: true, Favorites: tab})
        }
    }

    const handleDelete = (index) => {
        let tab = curFav.Favorites.map(a => {return {...a}})
        if (index > -1) {
            tab.splice(index, 1)
            if (tab.length > 0)
                setCurFav({isFavorite: true, Favorites: tab})
            else
                setCurFav({isFavorite: false})
        }
    }

    useEffect(  () => {
        tmpToken = window.localStorage.getItem("session")
        username = window.localStorage.getItem("username")

        if (tmpToken && username) {
            (async () => {
                if (await checkUser() === true) {
                    setName(username)
                    setToken(tmpToken)
                }
                else
                    throw 'User not found'
            })()
                .catch((e) => {
                    throw e
                })
        }
        return () => {}
    }, [])

  return (
    <Paper elevation={3} className={styles.container}>
      <MyHead title={'Home'}/>

      <main className={styles.main}>
        <MyTitle/>
          <Paper elevation={5} className={styles.content}>
              <Box className={styles.content_left}>
                  { name !== "" ? <Welcome username={name}/> : <Connexion/> }
                  <Search handleFav={handleAdd} username={name} token={token}
                            tab={curFav.Favorites} handleDelete={handleDelete}/>
              </Box>
              <Box className={styles.content_right}>
                  { name !== "" && (
                      <CurrentLocation city={cur_loc.city} country={cur_loc.country}
                                       precipitation={cur_loc.precipitation} weather={cur_loc.weather}/>
                  )}
                  { name !== "" && curFav.isFavorite && (
                      <Favorites tab={curFav.Favorites} handleDelete={handleDelete} username={name} token={token}/>
                  )}
              </Box>
          </Paper>
      </main>

    </Paper>
  )
}
