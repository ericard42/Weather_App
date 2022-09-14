import {useRouter} from "next/router";
import {authUser} from "../../queries/user";
import styles from "../../styles/Sign-In.module.css";
import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";

function LoginBox() {
    const [err, setErr] = useState([false, false])
    let router = useRouter()

    const validationForm = async (e) => {
        e.preventDefault()

        const name = document.querySelector('#Username').value
        const password = document.querySelector('#Password').value

        let error = [false, false]
        if (!name || !password) {
            if (!name)
                error[0] = true
            if (!password)
                error[1] = true
            setErr(error)
            return false
        }

        await authUser(name, password)
            .then(async (res) => {
                window.localStorage.setItem("session", res.access_token)
                window.localStorage.setItem("username", name)
                await router.push('/')
                return true
            })
            .catch((e) => {
                console.log(e)
                alert("User doesn't exist. Please verify you username and password.")
                return false
            })
    }


    return (
        <Box className={styles.login_box}>
            <h2 className={styles.login_text}>Login</h2>
            <Box component={"form"} autoComplete={"off"} className={styles.field_box} sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },}}>
                <TextField error={err[0]} required label={"Username"} id={"Username"}/>
                <TextField error={err[1]} required type={"password"} label={"Password"} id={"Password"}/>
                <Button variant={"outlined"} onClick={validationForm}>Login</Button>
            </Box>
        </Box>
    )
}

export default LoginBox