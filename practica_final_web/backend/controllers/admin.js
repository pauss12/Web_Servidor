const { comercioModel } = require('../models')

const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const { tokenSigComercio } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")

//Funcion para crear un comercio
const createComercio = async (req, res) => {

    try {

        req = matchedData(req)

        const passwordComercio = await encrypt(req.passwordComercio)

        const body = { ...req, passwordComercio }

        const dataComercio = await comercioModel.create(body)

        dataComercio.set('passwordComercio', undefined, { strict: false })

        const data = {
            token: await tokenSigComercio(dataComercio),
            dataComercio
        }

        res.status(200).send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, 'ERROR_CREATE_COMERCIO')
    }
}

const updateComercioAdmin = async (req, res) => {

    try {
            
        const body = matchedData(req)

        //Obtengo el user de la BBDD con el id que me llega en la request
        const dataComercio = await comercioModel.findById({ _id: body.id });

        //Hashear la contraseña que me llega en la request
        const passwordComercioHasheada = body.passwordComercio;

        //Si cambia la contraseña, tengo que volver a encriptarla; si no, la dejo igual. 
        const isPasswordMatch = await compare(passwordComercioHasheada, dataComercio.passwordComercio);

        if (!isPasswordMatch) {
            body.passwordComercio = passwordComercioHasheada
        }

        const data = await comercioModel.findByIdAndUpdate({ _id: body.id }, body)

        if (!data)
            return handleHttpError(res, 'Documento no encontrado', 404)
        else {
            //Si ha ido bien, devuelvo los datos actualizados
            const datosActualizados = await comercioModel.findById({ _id: body.id })

            const data = {
                token: await tokenSigComercio(datosActualizados),
                dataComercio: datosActualizados
            }

            res.status(200).send(data)
        }
        
    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_COMERCIO')
    }
}

module.exports = { createComercio, updateComercioAdmin }