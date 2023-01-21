import {$authHost} from "./http";

export const createEpic = async (epic) => {
    const {data} = await $authHost.post('/epic', epic)
    return data
}

export const updateEpic = async (epic) => {
    const {data} = await $authHost.put('/epic', epic)
    return data
}

export const deleteEpic = async (epic) => {
    const {data} = await $authHost.delete('/epic', { data: epic })
    return data
}

export const fetchEpic = async () => {
    const {data} = await $authHost.get('/epic')
    return data
}

