import axios from "axios";

export async function getUser(username, token) {
    return await axios({
        method: 'GET',
        url: "http://localhost:3000/user/" + username,
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

export async function postUser(data) {
    return await axios({
        method: 'POST',
        url: 'http://localhost:3000/user',
        data: data
    })
        .then((res) => {
            return (res.data)
        })
        .catch((e) => {
            throw e
        })
}

export async function authUser(username, password) {
    return await axios({
        method: 'POST',
        url: "http://localhost:3000/auth",
        data: {
            username: username,
            password: password
        }
    })
        .then((res) => {
            return (res.data)
        })
        .catch((e) => {
            throw e
        })
}