require('dotenv').config();

const express = require("express")
const morganBody = require("morgan-body")
const { IncomingWebhook } = require("@slack/webhook")

const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")

const { sequelize, dbConnectMySql } = require("./config/mysql")

const dbConnect = require('./config/mongo')

const cors = require("cors")

const app = express()//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)

app.use(cors())

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use("/api", require("./routes"))

app.use(express.static("storage"))//localhost:3000/file.jpg

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const port = process.env.PORT || 3000

if (process.env.ENGINE_DB === 'nosql') {

    dbConnect()
    // Crea las colecciones por defecto si no existieran

} else {

    dbConnectMySql()
    sequelize.sync() // Crea las tablas en la base de datos si no existieran
}

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)

})

const loggerStream = {
    write: message => {
        webHook.send({ text: message })
    },
}

morganBody(app, {
    noColors: true,

    //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function (req, res) {
        //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    }, stream: loggerStream
})

module.exports = app