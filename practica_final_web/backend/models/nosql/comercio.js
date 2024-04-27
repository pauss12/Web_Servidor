const mongoose = require("mongoose")

const mongooseDelete = require("mongoose-delete")

const comercioScheme = new mongoose.Schema(

    {
        nombreComercio: {
            type: String
        },
        cifComercio: {
            type: String,
            unique: true
        },
        direccionComercio: {
            type: String
        },
        emailComercio: {
            type: String,
            unique: true
        },
        passwordComercio: {
            type: String
        },
        telefonoContacto: {
            type: String
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)

//ID PAGINA: ALGO QUE IDENTIFIQUE A LA PAGINA DE CADA COMERCIO

comercioScheme.plugin(mongooseDelete, { overrideMethods: "all" })

module.exports = mongoose.model("comercio", comercioScheme)