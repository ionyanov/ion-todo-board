

export const getEpicsLocal = async (tasks) => {
    let res = [];
    tasks?.map(task => {
        res.push(task.epicId)
    });
    return [...new Set(res)] || [];
}

export const getTasksLocal = async () => {
    let store = [];
    try {
        store = localStorage.getItem('tasks')
            ? JSON.parse(localStorage.getItem('tasks'))
            : [];
    } catch (e) {
        console.log(e.message)
    }
    return store;
}

export const saveTasksLocal = async (tasks) => {
    try {
        await localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Failed to modify epics!');
    }
}