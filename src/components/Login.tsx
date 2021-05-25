import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import api from './Api'
import { useHistory } from 'react-router'

const Login = () => {
    const history = useHistory();
    const [username, usernameInput] = useInput("Username", "text")
    const [password, passwordInput] = useInput("Password", "password")
    return (
        <div>
            {usernameInput}
            <br/>
            {passwordInput}
            <br/>
            <Button variant='contained' onClick={e=>{
                console.log(Buffer.from(username+':'+password, 'utf-8').toString('base64'))
                api.get('/', {
                    headers: {
                        authorization: 'Basic ' + Buffer.from(username+':'+password, 'utf-8').toString('base64')
                    }
                }).then(res => {
                    console.log(res)
                    history.push('/')
                })
            }}>Login</Button>
        </div>
    )
}

function useInput(label: string, type: string|undefined) {
    const [value, setValue] = useState("")
    const input = <TextField label={label} type={type} value={value} onChange={e => setValue(e.target.value)}></TextField>
    return [value, input]
}
export default Login;