const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const StorageScheme = new mongoose.Schema(
    {
        idPropietario: {
            type: String,
            required: true
        },
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamp: true, 
        versionKey: false
    }
)
StorageScheme.plugin(mongooseDelete, { overrideMethods: "all" })
module.exports = mongoose.model("storages", StorageScheme) 