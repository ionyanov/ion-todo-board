import {$authHost} from "./http";
import jwt_decode from "jwt-decode";

export const login = async (password) => {
    const {data} = await $authHost.post('/login', {password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const logout = async () => {
    localStorage.removeItem('token')
}

export const check = async () => {
    const {data} = await $authHost.get('/login' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
