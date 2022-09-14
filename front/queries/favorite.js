import axios from "axios";

export async function deleteFavorite(username, tab, token, index) {
    await axios ({
        method: "DELETE",
        url: "http://localhost:3000/favorite/" + username,
        data: {
            city: tab[index].city,
            country: tab[index].country
        },
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": "application/json",
        }
    })
        .catch((e) => {
            throw e
        })
}

export async function postFavorite(location, username, token) {
    return await axios ({
        method: "POST",
        url: 'http://localhost:3000/favorite/' + username,
        data: {
            city: location.city,
            country: location.country
        },
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": "application/json",
        }
    })
        .catch((e) => {
            throw e
        })
}

export async function getFavorite(username, token) {
    return await axios({
        method: 'GET',
        url: 'http://localhost:3000/favorite/' + username,
        headers: {
            Authorization: 'Bearer ' + token,
            "content-type": "application/json",
        }
    })
        .then((res) => {
            return (res.data)
        })
        .catch((e) => {
            throw e
        })
}