
const { comercioModel } = require('../models')

const { handleHttpError } = require('../utils/handleError')

//const { matchedData } = require('express-validator')

//GET ITEMS -----------------------------------
const getComercios = async (req, res) => {

    try {

        const user = req.user
        
        //const data = await comercioModel.find({})

        const data = await comercioModel.find({}).sort({ cif: 1 });


        // Tengo todos los datos el cliente
        res.send({ data, user })

    } catch (error) {

        //Si no sirve el de por defecto, que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403);

    }
}

//GET ITEM ------------------------------------
const getComercio = async (req, res) => {

    try {

        const id = req.params.id

        //console.log(id)

        const data = await comercioModel.findOne({ cifComercio: id })

        //console.log(data)

        res.send(data)

    } catch (error) {

        //Si no sirve el de por defecto, que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEM', 403);

    }

}

/*const getComercio = async (req, res) => {

    try {

        //Me quedo solo con el id
        const { id } = matchedData(req)

        const data = await comercioModel.findById(id)

        res.send(data)

    } catch (err) {

        handleHttpError(res, "ERROR_GET_ITEM")
    }
}*/

//CREATE ITEM --------------------------------
const createComercio = async (req, res) => {

    try {

        //const body = matchedData(req)

        const { body } = req

        console.log(body)

        const data = await comercioModel.create(body)

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

/*const deleteItem = async (req, res) => {

    try {

        const id = req.params.id

        console.log(id)

        // "deleteOne" realiza el borrado físico en la BD
        const data = await tracksModel.deleteOne({ name: id });

        // "delete" realiza el borrado lógico en la BD
        //const data = await tracksModel.delete({ _id: id }); 

        res.send(data)

    } catch (err) {

        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }

}

//UPDATE
const updateItem = async (req, res) => {

    try {

        //Extrae el id y el resto lo asigna a la constante body ¿? NO LO TERMINO DE ENTENDER
        const { id, ...body } = matchedData(req)

        //tiene que ser findbyid, porque va buscando el id del objeto que quiere actualizar
        const data = await tracksModel.findById(id, body);

        //console.log(data)

        res.send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}
*/

//PATCH

module.exports = { getComercios, getComercio, createComercio };