import {makeAutoObservable} from "mobx";
import uuid from "react-uuid";
import {getEpicsLocal, getTasksLocal, saveTasksLocal} from "./localStore"

export default class LocalBoard {
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
        getTasksLocal().then(data => {
            this.setTasks(data);
            getEpicsLocal(data).then(data => this.setEpics(data));
        })
    }

    setTasks(val) {
        this._tasks = val;
        saveTasksLocal(this._tasks).then(r => {
            console.log("Tasks save to local storage")
        });
    }

    get tasks() {
        return this._tasks.filter(item => item.epicId === this.epics[this.curEpic]);
    }

    addTask(name, description) {
        this._tasks.push({
            id: uuid(),
            name: name,
            description: description,
            state: this.statuses[0],
            epicId: this.epics[this.curEpic]
        });
        return this._tasks;
    }

    updTask(task) {
        const index = this._tasks.findIndex((item) => item.id === task.id);
        this._tasks.splice(index, 1, task);
        return this._tasks;
    }

    deleteTask(taskId) {
        const index = this._tasks.findIndex((item) => item.id === taskId);
        this._tasks.splice(index, 1);
        return this._tasks;
    }

    async setTaskState(taskId, state) {
        let task = this._tasks.find(item => (item.id === taskId));
        if (task) {
            task.state = state;
            this.setTasks(this.tasks.filter(item => (item.id === item.id)));
        } else console.log("Task not found!!!");
    }

    setEpics(val) {
        this._epics = val;
    }

    get epics() {
        return this._epics;
    }

    addEpic(val) {
        this._epics.push(val);
    }

    deleteCurEpic() {
        this.setTasks(this._tasks.filter(item => item.epicId !== this.epics[this.curEpic]));
        this.initEpics();
    }

    async setCurEpic(val) {
        this._curEpic = val;
    }

    get curEpic() {
        return this._curEpic;
    }

    get statuses() {
        return ['TODO', 'In progress', 'DONE'];
    }
}