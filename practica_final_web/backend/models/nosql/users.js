const mongoose = require("mongoose")

const UsersScheme = new mongoose.Schema(

    {
        nombreUsuario: {
            type: String
        },
        emailUsuario: {
            type: String,
            unique: true,
        },
        passwordUsuario: {
            type: String
        },
        edadUsuario: {
            type: Number
        },
        sexoUsuario: {
            type: String
        },
        ciudadUsuario: {
            type: String
        },
        interesesUsuario: [{
            type: String
        }],
        permiteOfertas: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ["usuarioRegistrado", "admin"],
            default: "usuarioRegistrado"
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)
module.exports = mongoose.model("users", UsersScheme)