
const { storageModel, paginaModel} = require("../models")
const { matchedData } = require("express-validator")

const getFotosStorage = async (req, res) => {

    try {

        const data = await storageModel.find({})
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_GET_COMERCIOS')
    }
}

const getFotoStorage = async (req, res) => {

    try {

        const { id } = matchedData(req)
        const data = await storageModel.findById(id)
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_GET_COMERCIO")
    }
}


const createItem = async (req, res) => {

    const { id } = matchedData(req)

    const { file } = req

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

module.exports = { createItem, getFotosStorage, getFotoStorage }