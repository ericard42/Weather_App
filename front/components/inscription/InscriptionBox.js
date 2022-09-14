import {useRouter} from "next/router";
import styles from "../../styles/Sign-In.module.css";
import {postUser} from "../../queries/user";
import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";

function InscriptionBox() {
    const [err, setErr] = useState([false, false, false, false, false])

    const router = useRouter()

    const validationForm = async (e) => {
        e.preventDefault()

        const data = {
         username: document.querySelector('#Username').value,
         password: document.querySelector('#Password').value,
         email: document.querySelector('#Email').value,
         city: document.querySelector('#City').value,
         country: document.querySelector('#Country').value
        }
        if (!data.username || !data.password || !data.email || !data.city || !data.country) {
            let error = [false, false, false, false, false]
            if (!data.username)
                error[0] = true
            if (!data.password)
                error[1] = true
            if (!data.email)
                error[2] = true
            if (!data.city)
                error[3] = true
            if (!data.country)
                error[4] = true
            setErr(error)
            return false
        }

        await postUser(data)
            .then(async (res) => {
                window.localStorage.setItem("session", res.access_token)
                window.localStorage.setItem("username", data.username)
                await router.push('/')
                return true
            })
            .catch((e) => {
                alert(e.response.data.message)
            })
    }

    return (
        <Box className={styles.login_box}>
                <h2 className={styles.login_text}>Inscription</h2>
                <Box component={"form"} autoComplete={"off"} className={styles.field_box} sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                    <TextField error={err[0]} required label={"Username"} id={"Username"}/>
                    <TextField error={err[1]} required type={"password"} label={"Password"} id={"Password"}/>
                    <TextField error={err[2]} required type={"email"} label={"Email"} id={"Email"}/>
                    <TextField error={err[3]} required label={"City"} id={"City"}/>
                    <TextField error={err[4]} required label={"Country"} id={"Country"}/>
                    <Button variant={"outlined"} onClick={validationForm}>Inscription</Button>
                </Box>
        </Box>
    )
}

export default InscriptionBox