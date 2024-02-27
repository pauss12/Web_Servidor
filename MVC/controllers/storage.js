const router = require("../routes")

const createItem = async (req, res) => {
    const { body, file } = req
    const fileData = {
        filename: file.filename,
        url: process.env.PUBLIC_URL + "/" + file.filename
    }
    const data = await storageModel.create(fileData)
    res.send(data)
}
module.exports = { createItem }