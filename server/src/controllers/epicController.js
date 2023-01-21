const {Epic, Task} = require('../data/models');

class EpicController {
    async insert(req, res) {
        let epic ={};
        try {
            const {id, name} = req.body
            if(id){
                epic = await Epic.findByPk(id)
                if(epic){
                    throw new Error("Same ID already exists")
                }
                else {
                    epic =  await Epic.create({name});
                }
            }
            else {
                epic =  await Epic.create({name});
            }
        }
        catch (e) {
            return res.json({epic: epic, error: e.message })
        }
        return res.json(epic)
    }

    async update(req, res) {
        let epic ={};
        try {
            const {id, name} = req.body;
            epic = await Epic.findByPk(id);
            if(epic){
                await epic.update( {name: name} );
                await epic.save();
            }
            else {
                throw new Error("Epic not found!");
            }
        }
        catch (e) {
            return res.json({epic: epic, error: e.message })
        }
        return res.json(epic)
    }

    async delete(req, res) {
        let epic
        try{
            const {id} = req.body
            await Task.destroy({
                where: {
                    epicId: id
                }
            });
            epic = await Epic.destroy({
                where: {
                    id: id
                }
            })
        } catch (e) {
            return res.json({epic: epic, error: e.message })
        }
        return res.json(epic)
    }

    async getAll(req, res) {
        const epics = await Epic.findAll()
        return res.json(epics)
    }

}

module.exports = new EpicController()
