const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const Epic = sequelize.define('epic', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description : {type: DataTypes.STRING},
    state : {type: DataTypes.STRING}
})

Epic.hasMany(Task)
Task.belongsTo(Epic)

module.exports = { Epic, Task }