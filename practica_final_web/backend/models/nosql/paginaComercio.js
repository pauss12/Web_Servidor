const mongoose = require("mongoose")

const mongooseDelete = require("mongoose-delete")

const paginaComercioScheme = new mongoose.Schema(

    {
        tokenComercio: {
            type: String
        },
        paginaId: {
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
            type: Number
        },
        numeroPutuaciones: {
            type: Number
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
