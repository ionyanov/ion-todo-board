require('dotenv').config()
const express = require('express')
const cors = require('cors')

const path = require('path');
const router = require("./src/router");
const sequelize = require('./src/data/db');
const errorHandler = require('./src/errorHandler');

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(process.env.API_URL, router)
//must be last
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });

        await sequelize.sync().then(() => {
            console.log('DB tables created successfully!');
        });

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()