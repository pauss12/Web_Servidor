const router = require("../routes")

const storageModel = require("../models/nosql/storage")

const createItem = async (req, res) => {

    const { body, file } = req

    console.log(body)

    const fileData = {
        filename: file.filename,
        idPropietario: body.idPropietario
    }

    const data = await storageModel.create(fileData)

    res.send(data)
}

module.exports = { createItem }