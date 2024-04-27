const { comercioModel } = require('../models')

const { matchedData } = require('express-validator')

const { handleHttpError } = require('../utils/handleError')

const { tokenSigComercio } = require("../utils/handleJwt")

const { encrypt } = require("../utils/handlePassword")

//Funcion para crear un comercio
const createComercio = async (req, res) => {

    try {

        /*const body = matchedData(req)

        const data = await comercioModel.create(body)
        res.status(201).send(data)*/

        req = matchedData(req)

        const passwordComercio = await encrypt(req.passwordComercio)

        const body = { ...req, passwordComercio }

        const dataComercio = await comercioModel.create(body)

        dataComercio.set('passwordComercio', undefined, { strict: false })

        const data = {
            token: await tokenSigComercio(dataComercio),
            user: dataComercio
        }

        res.send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_COMERCIO')
    }
}

module.exports = { createComercio }