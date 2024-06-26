const mongoose = require("mongoose")

const mongooseDelete = require("mongoose-delete")

const paginaComercioScheme = new mongoose.Schema(

    {
        idPagina: {
            type: String
        },
        titulo: {
            type: String
        },
        ciudadComercio: {
            type: String
        },
        actividadComercio: {
            type: String
        },
        resumenComercio: {
            type: String
        },
        textos: [{
            type: String
        }],
        fotos: [{
            type: String
        }],
        puntuacion: {
            type: Number,
            default: 0
        },
        numeroPuntuaciones: {
            type: Number,
            default: 0
        },
        comentarios: [{
            type: String
        }]
    },
    {
        timestamp: true,
        versionKey: false
    }
)

paginaComercioScheme.plugin(mongooseDelete, { overrideMethods: "all" })

module.exports = mongoose.model("paginaComercio", paginaComercioScheme)
