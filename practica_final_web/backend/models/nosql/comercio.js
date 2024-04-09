const mongoose = require("mongoose")

const mongooseDelete = require("mongoose-delete")

const comercioScheme = new mongoose.Schema(

    {
        nombreComercio: {
            type: String
        },
        cifComercio: {
            type: String
        },
        direccion: {
            type: String

        },
        email: {
            type: String
        },
        telefonoContacto: {
            type: String
        },
        idPagina: {
            type: Number
        },
        ciudad: {
            type: String
        },
        actividad: {
            type: String
        },
        textos: [{
            type: String
        }],
        fotos: [{
            type: String
        }],
        scoring: {
            type: Number
        },
        numeroPuntuaciones: {
            type: Number
        },
        reseñas: [{
            type: String
        }]
    },
    {
        timestamp: true,
        versionKey: false
    }
)

comercioScheme.plugin(mongooseDelete, { overrideMethods: "all" })

module.exports = mongoose.model("comercio", comercioScheme)