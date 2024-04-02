const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true; //TODO crear patrón
                },
                message: "ERROR_URL",
            }
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId // Estructura (string) especial de mongo
        }
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)

/**
 * Implementar método propio (custom findAllData static function) con relación a Storage
 */
TracksScheme.statics.findAllData = function () {
    // "this." hace referencia a su propio modelo
    const joinData = this.aggregate([
        {
            // lookup =~ join (STAGE 1)
            $lookup: {
                from: "storages",
                localField: "mediaId", // tracks.mediaId
                foreignField: "_id",   // storages._id
                as: "audio" // Alias audio
            }
        },
        /*{
              // From left join to inner join (STAGE 2) 
              $unwind:"$audio"
          } */
    ])
    return joinData
}

TracksScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("tracks", TracksScheme) // Nombre de la colección (o de la tabla en SQL)