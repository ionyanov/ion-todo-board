import {$authHost} from "./http";

export const createTask = async (task) => {
    const {data} = await $authHost.post('task', task)
    return data
}

export const updateTask = async (task) => {
    const {data} = await $authHost.put('/task', task);
    return data
}

export const deleteTask = async (task) => {
    const {data} = await $authHost.delete('/task', {data: task})
    return data
}

export const fetchTask = async (epicId) => {
    const {data} = await $authHost.get('/task/' + epicId)
    return data
}

