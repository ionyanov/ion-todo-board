import {$authHost} from "./http";
import jwt_decode from "jwt-decode";

const LOCAL_STORAGE_TOKEN_KEY = 'token';

export const login = async (password) => {
    const {data} = await $authHost.post('/login', {password});
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
    return jwt_decode(data.token);
}

export const logout = async () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}

export const check = async () => {
    const {data} = await $authHost.get('/login');
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
    return jwt_decode(data.token);
}
