
const { comercioModel } = require('../models')

const { handleHttpError } = require('../utils/handleError')

//const { matchedData } = require('express-validator')

/*
    GET ITEMS --------------------------------

    Cuando llega a esta funcion, la llamada del HTTP es "GET http://localhost:3000/api/comercio" 

    cuando en el "HTTP" lee la ruta "/api", va a ir a la carpeta "routes" y despues pone "comercio" por lo que va a buscar ese archivo en la carpeta controllers  y luego la funcion "getComercios" "router.get("/", getComercios)"

    NO le mete ningun valor para filtrar porque queremos sacar todos los comercios que hay dentro de la BBDD.

    Una vez ya los tengo, los ordeno de manera ascendente por su cif y los mando al cliente

*/

const getComercios = async (req, res) => {

    try {

        const data = await comercioModel.find({})

        //console.log(data)

        //ordenarlos ascendentemente por su cif cuando ya los tienes guardado en data
        data.sort((a, b) => a.cifComercio.localeCompare(b.cifComercio))
        
        //console.log(data)

        res.send(data)

    } catch (error) {

        //Si no sirve el de por defecto, que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403);

    }
}

/*
    GET ITEM POR EL CIF DEL COMERCIO ----------------------------

    Cuando llega a esta funcion, la llamada del HTTP es "GET http://localhost:3000/api/comercio/A12345622" y ese ultimo valor es el cif del comercio que queremos buscar

    cuando en el "HTTP" lee la ruta "/api", va a ir a la carpeta "routes" y despues pone "comercio" por lo que va a buscar ese archivo en la carpeta controllers  y luego la funcion "getComercio" "router.get("/:id", getComercio)"

    EL codigo sabe donde esta esa funcion, por que le hemos puesto esta linea 

    "const { getComercios, getComercio, createComercio } = require("../controllers/comercio")" para que sepa donde ir a buscar esas funciones que se van a necesitar

    Luego, en la funcion "getComercio" se hace un "find" para buscar el comercio por su cif en la BBDD, que es el parametro que le hemos pasado en la llamada del HTTP

*/
const getComercio = async (req, res) => {

    try {

        const id = req.params.id

        //console.log(id)

        const data = await comercioModel.findOne({ cifComercio: id })

        //console.log(data)

        res.send(data)

    } catch (error) {

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

/*
    DELETE ITEM POR EL CIF DEL COMERCIO ----------------------------

    Cuando llega a esta funcion, la llamada del HTTP es "DELETE http://localhost:3000/api/comercio/A12345622" y ese ultimo valor es el cif del comercio que queremos borrar

    cuando en el "HTTP" lee la ruta "/api", va a ir a la carpeta "routes" y despues pone "comercio" por lo que va a buscar ese archivo en la carpeta controllers  y luego la funcion "deleteComercio" "router.delete("/:id", deleteComercio)"

    EL codigo sabe donde esta esa funcion, por que le hemos puesto esta linea 

    "const { getComercios, getComercio, createComercio, deleteComercio } = require("../controllers/comercio")" para que sepa donde ir a buscar esas funciones que se van a necesitar

    Luego, en la funcion "deleteComercio" se hace un "deleteOne" para buscar el comercio por su cif en la BBDD, que es el parametro que le hemos pasado en la llamada del HTTP


    Hay dos tipos de "DELETE" que se pueden hacer en la BBDD, uno es el "deleteOne" que realiza el borrado físico en la Base de datos, que eliminaria elemento de la BBDD y el otro es el "delete" que realiza el borrado lógico en la BD; es decir, simplemente actualizaria el flag de eliminado, y cuando haces el "GET", no apareceria, pero sigue en la BBDD.
*/

const deleteComercio = async (req, res) => {

    try {

        const id = req.params.id

        console.log(id)

        // "deleteOne" realiza el borrado físico en la BD
        //const data = await comercioModel.deleteOne({ cifComercio: id });

        // "delete" realiza el borrado lógico en la BD
        const data = await comercioModel.delete({ cifComercio: id }); 

        //console.log(data)

        res.send(data)

    } catch (err) {

        handleHttpError(res, 'ERROR_DELETE_COMERCIO')
    }

}

/*
    PUT ITEM POR EL CIF DEL COMERCIO -----------------------

    Se hace una llamada a "PUT" para poder actualizar un comercio haciendo un "updateOne" en la BBDD.

    Se le pasa el id del comercio que queremos actualizar y el body con los datos que queremos actualizar; ya que como hacemos "put" significa que se le va a pasar el "body" entero, no solo un campo.

    Luego, se manda el resultado de la operacion al cliente para que sepa si se ha realizado correctamente o no.


*/

const updateComercio = async (req, res) => {

    try {

        const id = req.params.id

        const { body } = req

        console.log(id)

        console.log(body)

        const data = await comercioModel.updateOne({ cifComercio: id }, body)

        console.log(data)

        res.send(data)

    } catch (err) {

        handleHttpError(res, 'ERROR_UPDATE_COMERCIO')
    }

}

module.exports = { getComercios, getComercio, createComercio, deleteComercio, updateComercio };