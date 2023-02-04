import {makeAutoObservable} from "mobx";
import {createEpic, deleteEpic} from "../../api/epicAPI";
import {getEpicsGlobal, getTasksGlobal} from "./globalStore";
import {createTask, deleteTask, updateTask} from "../../api/taskAPI";

export default class GlobalBoard {
    constructor() {
        this._tasks = [];
        this._epics = [];
        this._curEpic = 0;

        this.initEpics().then(() => {
            console.log("Epic load")
        });
        makeAutoObservable(this);
    }

    async initEpics() {
        let res = [];
        await getEpicsGlobal().then(data => {
            data?.map(epic => {
                res[epic.id] = epic.name;
            })
        }).finally(() => {
            this.setEpics(res);
        })
    }

    setTasks(val) {
        this._tasks = val;
    }

    get tasks() {
        return this._tasks || [];
    }

    addTask(name, description) {
        createTask({
                name: name,
                description: description,
                state: this.statuses[0],
                epicId: this.curEpic
            }
        ).then(task => {
                this._tasks.push(task);
                this.setCurEpic(this.curEpic);
            }
        ).catch(e => console.log(e.message))
        return this._tasks;
    }

    updTask(task) {
        updateTask(task).then(task => {
                this._tasks.push(task);
                this.setCurEpic(this.curEpic);
            }
        ).catch(e => console.log(e.message))
        return this._tasks;
    }

    deleteTask(taskId) {
        deleteTask({id: taskId}).then((data) => {
            this.setCurEpic(this.curEpic);
        }).catch(e => console.log(e.message));
        return this._tasks;
    }

    async setTaskState(taskId, state) {
        await updateTask({id: taskId, state: state}).then(task => {
                this.setCurEpic(this.curEpic);
            }
        ).catch(e => console.log(e.message));
    }

    setEpics(val) {
        this._epics = val;
    }

    get epics() {
        return this._epics;
    }

    addEpic(val) {
        createEpic({name: val}
        ).then(epic => {
                this._epics[epic.id] = epic.name;
            }
        ).catch(e => console.log(e.message));
    }

    deleteCurEpic() {
        deleteEpic({id: this.curEpic}).then(e => {
            this.initEpics();
        });
    }

    async setCurEpic(val) {
        this._curEpic = val;
        await getTasksGlobal(val).then(data => {
            this.setTasks(data)
        });
    }

    get curEpic() {
        return this._curEpic;
    }

    get statuses() {
        return ['TODO', 'In progress', 'DONE'];
    }
}