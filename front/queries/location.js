import axios from "axios";

export async function getTemp(city, country) {
    return await axios({
        method: "POST",
        url: 'http://localhost:3000/location',
        data: {
            city: city,
            country: country,
        }
    })
        .then((res) => {
            return (res.data)
        })
        .catch((e) => {
            throw e
        })
}

export async function postLocation(city, country) {
    return await axios ({
        method: "POST",
        url: 'http://localhost:3000/location',
        data: {
            city: city,
            country: country,
        }
    })
        .then((res) => {
            return (res.data)
        })
        .catch((e) => {
            throw e
        })
}

