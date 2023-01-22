import {fetchTask} from "./taskAPI";
import {fetchEpic} from "./epicAPI";

export const getEpicsGlobal = async () => {
    let epics = [];
    try{
        epics = await fetchEpic();
    }
    catch (e){ console.log (e.message)}
    return epics;
}

export const getTasksGlobal = async (epicId) => {
    let store = [];
    try{
        await fetchTask(epicId).then( data => {
            store = data.rows || data;
        })
    }
    catch (e){ console.log (e.message)}
    return store;
}

export const getEpicsLocal = async (tasks) => {
    let res = [];
    tasks?.map(task => { res.push(task.epicId)});
    return [...new Set(res)]||[];
}

export const getTasksLocal = async () => {
    let store = [];
    try{
        store = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];
    }
    catch (e){ console.log (e.message)}
    return store;
}

export const saveTasksLocal = async (tasks) => {
    try {
        await localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Failed to modify epics!');
    }
}