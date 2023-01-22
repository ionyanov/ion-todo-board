import {makeAutoObservable} from "mobx";
import uuid from "react-uuid";
import {createEpic, deleteEpic} from "../api/epicAPI";
import {getEpicsGlobal, getEpicsLocal, getTasksGlobal, getTasksLocal, saveTasksLocal} from "../api/globalStore";
import {createTask, deleteTask, updateTask} from "../api/taskAPI";

export default class Board {
    constructor() {
        this._tasks = [];
        this._epics = [];
        this._curEpic = 0;
        this._islocal = true;
        this._islogin = false;

        makeAutoObservable(this);
    }

    async initEpics() {
        if (this._islocal) {
            getTasksLocal().then(data => {
                this.setTasks(data);
                getEpicsLocal(data).then( data => this.setEpics(data) );
            })
        } else {
            let res = [];
            await getEpicsGlobal().then(data => {
                data?.map(epic => {
                    res[epic.id] = epic.name;
                })
            }).finally(() => {
                this.setEpics(res);
            })
        }
    }

    setIsLocal(val) {
        this._islocal = val;
    }

    get isLocal() {
        return this._islocal;
    }

    setIsLogin(val) {
        this._islogin = val;
    }

    get isLogin() {
        return this._islogin;
    }

    setTasks(val) {
        this._tasks = val;
        if (this._islocal) {
            saveTasksLocal(this._tasks).then(r => {
            });
        }
    }

    get tasks() {
        if (this._islocal) {
            return this._tasks.filter(item => item.epicId === this.epics[this.curEpic]);
        } else {
            return this._tasks || [];
        }
    }

    addTask(name, description) {
        if (this._islocal) {
            this._tasks.push({
                id: uuid(),
                name: name,
                description: description,
                state: this.statuses[0],
                epicId: this.epics[this.curEpic]
            });
        } else {
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
        }
        return this._tasks;
    }

    updTask(task) {
        if (this._islocal) {
            const index = this._tasks.findIndex((item) => item.id === task.id);
            this._tasks.splice(index, 1, task);
        } else {
            updateTask(task).then(task => {
                    this._tasks.push(task);
                    this.setCurEpic(this.curEpic);
                }
            ).catch(e => console.log(e.message))
        }
        return this._tasks;
    }

    deleteTask(taskId) {
        if (this._islocal) {
            const index = this._tasks.findIndex((item) => item.id === taskId);
            this._tasks.splice(index, 1);
        } else {
            deleteTask({id: taskId}).then((data) => {
                this.setCurEpic(this.curEpic);
            }).catch(e => console.log(e.message));
        }
        return this._tasks;
    }

    async setTaskState(taskId, state) {
        if (this._islocal) {
            let task = this._tasks.find(item => (item.id === taskId));
            if (task) {
                task.state = state;
                this.setTasks(this.tasks.filter(item => (item.id === item.id)));
            } else console.log("Task not found!!!");
        } else {
            await updateTask({id: taskId, state: state}).then(task => {
                    this.setCurEpic(this.curEpic);
                }
            ).catch(e => console.log(e.message));
        }
    }

    setEpics(val) {
        this._epics = val;
    }

    get epics() {
        return this._epics;
    }

    addEpic(val) {
        if (this._islocal) {
            this._epics.push(val);
        } else {
            createEpic({name: val}
            ).then(epic => {
                    this._epics[epic.id] = epic.name;
                }
            ).catch(e => console.log(e.message))
        }
    }

    deleteCurEpic() {
        if (this._islocal) {
            this.setTasks(this._tasks.filter(item => item.epic !== this.epics[this.curEpic]));
            this.initEpics();
        } else {
            deleteEpic({id: this.curEpic}).then(e => {
                this.initEpics();
            });
        }
    }

    async setCurEpic(val) {
        this._curEpic = val;
        if (!this._islocal) {
            await getTasksGlobal(val).then(data => {
                this.setTasks(data)
            });
        }
    }

    get curEpic() {
        return this._curEpic;
    }

    get statuses() {
        return ['TODO', 'In progress', 'DONE'];
    }
}