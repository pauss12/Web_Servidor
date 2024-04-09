const mongoose = require("mongoose")
const UsersScheme = new mongoose.Schema(
    {
        nombre: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        edad: {
            type: Number
        },
        ciudad: {
            type: String
        },
        intereses: [{
            type: String
        }],
        permiteOfertas: {
            type: Boolean,
            default: false
        },
        role: {
            type: ["usuarioRegistrado", "admin"],
            default: "usuarioRegistrado"
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)
module.exports = mongoose.model("users", UsersScheme)