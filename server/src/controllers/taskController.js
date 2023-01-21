const {Task, Epic} = require('../data/models');

class TaskController {
    async insert(req, res) {
        let task = {};
        try {
            const {id, name, description, state, epicId} = req.body
            if (id) {
                task = await Task.findByPk(id)
                if (task) {
                    throw new Error("Same ID already exists")
                } else {
                    task = await Task.create({id, name, description, state, epicId});
                }
            } else {
                task = await Task.create({name, description, state, epicId});
            }
        } catch (e) {
            return res.json({task: task, error: e.message})
        }
        return res.json(task)
    }

    async update(req, res) {
        let task = {};
        try {
            const {id, name, description, state} = req.body;
            task = await Task.findByPk(id)
            if (task) {
                await task.update(
                    {
                        name: name,
                        description: description,
                        state: state
                    }
                ).then(() => {
                    task.save()
                });
            } else {
                throw new Error("Task not found!");
            }
        } catch (e) {
            return res.json({task: task, error: e.message})
        }
        return res.json(task)
    }

    async delete(req, res) {
        let task
        const {id} = req.body
        try {
            const {id} = req.body
            task = await Task.destroy({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return res.json({id: '-' + id, error: e.message})
        }
        return res.json(task)
    }

    async getAll(req, res) {
        let tasks = [];
        try {
            await Task.findAll().then((data) => {
                tasks = data;
            })
        } catch (e) {
            return res.json({task: tasks, error: e.message})
        }
        return res.json(tasks)
    }

    async getByEpic(req, res) {
        let tasks = [];
        try {
            tasks = await Task.findAndCountAll({
                where: {
                    epicId: req.params.epicId
                }
            })
        } catch (e) {
            return res.json({task: tasks, error: e.message})
        }
        return res.json(tasks)
    }
}

module.exports = new TaskController()
