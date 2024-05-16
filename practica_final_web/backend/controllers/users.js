const { usersModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const { compare } = require('../utils/handlePassword')
const { tokenSigUser } = require('../utils/handleJwt')
const jwt = require('jsonwebtoken')

/**
 * Obtener usuario de la base de datos
 * @param {*} req
 * @param {*} res
 */

const getUser = async (req, res) => {

    try {

        const { city } = matchedData(req)

        const data = await usersModel.find({ ciudadUsuario: city })

        //Filtrar por los usuarios que tengan recibirOfertas = true
        const dataFiltrada = data.filter(user => user.permiteOfertas === true)

        res.status(200).send(dataFiltrada)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")

    }
}

/**
 * Actualiza los datos del usuario en la base de datos
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {

    try {

        const body = matchedData(req)

        const token = req.headers.authorization.split(' ').pop()
        const tokenDecodificado = jwt.decode(token)

        const user = await usersModel.findById({ _id: tokenDecodificado._id });

        if (!user)
            return handleHttpError(res, 'USER NOT FOUND', 404)

        if (user._id.toString() !== body.id)
            return handleHttpError(res, 'ID_USER_DOES_NOT_MATCH', 401)

        //Hashear la contraseña que me llega en la request
        const passwordUsuarioHasheada = body.passwordUsuario;

        //Si cambia la contraseña, tengo que volver a encriptarla; si no, la dejo igual. 
        const isPasswordMatch = await compare(passwordUsuarioHasheada, user.passwordUsuario);

        if (!isPasswordMatch) {
            body.passwordUsuario = passwordUsuarioHasheada
        }

        const data = await usersModel.findByIdAndUpdate({ _id: body.id }, body)

        if (!data)
            return handleHttpError(res, 'Documento no encontrado', 404)
        else {

            //Si ha ido bien, devuelvo los datos actualizados
            const datosActualizados = await usersModel.findById({ _id: body.id })

            const data = {
                token: await tokenSigUser(datosActualizados),
                user: datosActualizados
            }

            res.status(200).send(data)
        }

    } catch (err) {
        
        console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}

/**
 * Borra el usuario que el id recibidio
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {

    try {

        const { id } = matchedData(req)
        
        const data = await usersModel.deleteOne({ _id: id });

        res.status(200).send(data)

    } catch (err) {
        //console.log(err)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}



module.exports = { getUser, updateItem, deleteItem, updateItem };