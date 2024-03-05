const { tracksModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')


const getItems = async (req, res) => {
    
    try {

        const data = await tracksModel.find({})
        res.send(data)

    } catch (error) {

        //Si no sirve el de por defecto, que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS' , 403);

    }
}

const getItem = async (req, res) => {

    const id = req.params.id

    const data = await tracksModel.findOne({ name: id })

    res.send(data)

}

const createItem = async (req, res) => {

    try {
        
        const body = matchedData(req)

        console.log(body)

        const data = await tracksModel.create(body)

        res.send(data)
    }
    catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}

module.exports = { getItems, getItem, createItem };