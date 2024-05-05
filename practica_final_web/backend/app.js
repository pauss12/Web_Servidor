require('dotenv').config();

const express = require("express")

/*
    const morganBody = require("morgan-body")
const { IncomingWebhook } = require("@slack/webhook")
*/ 

const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")

const dbConnect = require('./config/mongo')

const cors = require("cors")

const app = express()

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use("/api", require("./routes"))

app.use(express.static("storage"))
//localhost:3000/file.jpg

//const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const port = process.env.PORT || 3000

dbConnect()

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)

})

/*

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

*/

module.exports = app