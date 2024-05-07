const { matchedData } = require("express-validator")
const { tokenSigUser } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const { handleHttpError } = require("../utils/handleError")
const { usersModel } = require("../models")

/**
 * Encargado de hacer registro del usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerControl = async (req, res) => {
    
    try {

        req = matchedData(req)

        const passwordUsuario = await encrypt(req.passwordUsuario)
        const body = { ...req, passwordUsuario }
        const dataUser = await usersModel.create(body)
        
        dataUser.set('passwordUsuario', undefined, { strict: false })

        const data = {
            token: await tokenSigUser(dataUser),
            user: dataUser
        }

        res.send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

/**
 * Encargado de hacer login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginControl = async (req, res) => {

    try {
        
        req = matchedData(req)

        const user = await usersModel.findOne({ emailUsuario: req.emailUsuario }).select("passwordUsuario nombreUsuario role emailUsuario")

        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }

        const hashPassword = user.passwordUsuario;
        
        const check = await compare(req.passwordUsuario, hashPassword)

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('passwordUsuario', undefined, { strict: false })
        const data = {
            token: await tokenSigUser(user),
            user
        }

        res.send(data)

    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { registerControl, loginControl }