
const { tracksModel } = require('../models')

const { handleHttpError } = require('../utils/handleError')

const { matchedData } = require('express-validator')

//GET ITEMS -----------------------------------
const getItems = async (req, res) => {
    
    try {

        const user = req.user
        const data = await tracksModel.find({})

        // Tengo todos los datos el cliente
        res.send({ data, user })
        
    } catch (error) {

        //Si no sirve el de por defecto, que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS' , 403);

    }
}

//GET ITEM ------------------------------------
const getItem = async (req, res) => {

    const id = req.params.id

    console.log(id)

    const data = await tracksModel.findOne({ name: id })

    res.send(data)

}

//CREATE ITEM --------------------------------
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

//DELETE ----------------------------------------------
/*const deleteItem = async (req, res) => {

    try {
        const { name } = matchedData(req)
    
        // "deleteOne" realiza el borrado físico en la BD
        const data = await tracksModel.deleteOne({ name: name });
        
        // "delete" realiza el borrado lógico en la BD
        //const data = await tracksModel.delete({ _id: id }); 
        res.send(data)

    } catch (err) {
        
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}*/

const deleteItem = async (req, res) => {

    try {
        
        const id = req.params.id

        console.log(id)
    
        // "deleteOne" realiza el borrado físico en la BD
        const data = await tracksModel.deleteOne({ name: id });

        res.send(data)

    } catch (err) {
        
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }

}

//UPDATE


//PATCH

module.exports = { getItems, getItem, createItem, deleteItem };