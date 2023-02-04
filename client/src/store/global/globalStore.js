import {fetchTask} from "../../api/taskAPI";
import {fetchEpic} from "../../api/epicAPI";

export const getEpicsGlobal = async () => {
    let epics = [];
    try {
        epics = await fetchEpic();
    } catch (e) {
        console.log(e.message)
    }
    return epics;
}

export const getTasksGlobal = async (epicId) => {
    let store = [];
    try {
        await fetchTask(epicId).then(data => {
            store = data.rows || data;
        })
    } catch (e) {
        console.log(e.message)
    }
    return store;
}