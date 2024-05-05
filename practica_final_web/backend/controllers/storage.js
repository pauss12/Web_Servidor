const router = require("../routes")

const { storageModel, paginaModel} = require("../models")

const createItem = async (req, res) => {

    const { body, file } = req

    const { id } = req.params

    console.log(id)

    const fileData = {

        filename: file.filename,
        url: process.env.PUBLIC_URL + "/" + file.filename,
        idPropietario: id
    }

    const data = await storageModel.create(fileData)

    //Tengo que añadir la ruta de la imagen en la variable de fotos de la pagina del comercio al que pertenece
    
    const paginaComercio = await paginaModel.findOne({ _id: id })

    const fotos = paginaComercio.fotos;

    fotos.push(fileData.url)

    await paginaModel.updateOne({ _id: id }, { fotos: fotos })

    res.send(data)
}

module.exports = { createItem }