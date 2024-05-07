const { paginaModel } = require('../models')

const { matchedData } = require('express-validator')

const { handleHttpError } = require('../utils/handleError')

const { verifyToken } = require('../utils/handleJwt')

//Variable global para el array de puntuaciones
let puntuacionesGlobal = []


/**
 * Obtener lista de paginas de comercio de la base de datos sin ningun tipo de fitro
*/
const getPaginasComercio = async (req, res) => {

    try {

        const data = await paginaModel.find({})
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_GET_PAGINAS_COMERCIO')
    }
}

const getPaginasComercioCiudad = async (req, res) => {

    try {

        const city = req.params.city

        const data = await paginaModel.find({ciudadComercio: city})
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_GET_PAGINAS_COMERCIO')
    }
}

const getPaginasComercioCiudadActividad = async (req, res) => {

    try {

        const city = req.params.city
        const activity = req.params.activity

        const data = await paginaModel.find({ ciudadComercio: city, actividadComercio: activity })
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_GET_PAGINAS_COMERCIO')
    }
}

const getPaginaComercio = async (req, res) => {

    try {
        
        
        const { id } = matchedData(req);
        const data = await paginaModel.findOne({_id: id});
        res.status(200).send(data)
        

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")

    }
}

const createPaginaComercio = async (req, res) => {

    try {

        const body = matchedData(req)
        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        body.idPagina = dataToken._id;

        const data = await paginaModel.create(body)

        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_CREATE_PAGINA_COMERCIO")
    }
}

const subirTextosComercio = async (req, res) => {

    try {
            
        const { id } = matchedData(req)
        const { textos } = matchedData(req)

        //Quiero que los textos se vayan añadiendo a un array de textos en caso de que quiera añadir mas de uno por separado
        const pagina = await paginaModel.findOne({ _id: id })

        const textosActuales = pagina.textos

        //como junto el array que esta en la base de datos, com el array que me llega por el body
        textosActuales.push(...textos)

        const data = await paginaModel.updateOne({_id: id }, {textos: textosActuales })

        res.status(200).send(data)
    
    } catch (err) {
    
        //console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_TEXTOS_COMERCIO')
    } 
}

const deletePaginaComercio = async (req, res) => {

    try {

        const { id } = matchedData(req)
        const data = await paginaModel.deleteOne({ _id: id });
        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}

const updatePatchComercio = async (req, res) => {

    try {
    
        //La nota q me pasen, la guardo en "puntuacionGlobal"; aumento uno el contador de puntuacones de la BBDD, y luego hago la media
        const { id, puntuacion, comentarios } = matchedData(req)

        const pagina = await paginaModel.findOne({ _id: id })


        const numeroPuntuaciones = pagina.numeroPuntuaciones

        //Si el array de puntuaciones esta vacio, meto la primera puntuacion
        if (puntuacionesGlobal.length == 0)
            puntuacionesGlobal.push(puntuacion)
        else
            puntuacionesGlobal.push(puntuacion)


        //Hago la media de las puntuaciones que estan en el array
        let sumaPuntuaciones = 0

        for (let i = 0; i < puntuacionesGlobal.length; i++) {
            sumaPuntuaciones += puntuacionesGlobal[i]
        }

        //Cuando se hace una puntuacion, se suma uno al contador
        const nuevaPuntuacion = sumaPuntuaciones / (numeroPuntuaciones + 1)

        const data = await paginaModel.updateOne({ _id: id }, { puntuacion: nuevaPuntuacion, numeroPuntuaciones: numeroPuntuaciones + 1 , comentarios: comentarios})

        //Actualizo la puntuacion, el numero de puntuaciones y el comentario

        res.status(200).send(data)

    } catch (err) {
     
        //console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEM')
    
    }

}




module.exports = { getPaginasComercio, createPaginaComercio, deletePaginaComercio, subirTextosComercio, getPaginaComercio, getPaginasComercioCiudad, getPaginasComercioCiudadActividad, updatePatchComercio }