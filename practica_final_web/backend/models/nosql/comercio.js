const mongoose = require("mongoose")

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

module.exports = mongoose.model("comercios", comercioScheme)