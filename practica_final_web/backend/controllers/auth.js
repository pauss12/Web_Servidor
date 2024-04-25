const { matchedData } = require("express-validator")

const { tokenSign } = require("../utils/handleJwt")

const { encrypt, compare } = require("../utils/handlePassword")

const { handleHttpError } = require("../utils/handleError")

const { usersModel } = require("../models")

const registerControl = async (req, res) => {
    
    try {

        req = matchedData(req)

        const passwordUsuario = await encrypt(req.passwordUsuario)

        const body = { ...req, passwordUsuario }

        const dataUser = await usersModel.create(body)
        
        dataUser.set('passwordUsuario', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
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

        // Buscar el usuario por su email; y le pide que devuelva solo los campos que se le indican
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
            token: await tokenSign(user),
            user
        }

        res.send(data)

    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const updateUser = async (req, res) => {

    try {

        // Obtener el email del usuario de los parámetros de la solicitud
        const { email } = req.params; 

        // Obtener el nuevo rol del usuario de los parámetros de la solicitud
        const { role } = req.body; 

        // Verificar si el email proporcionado es válido
        if (!email) {
            handleHttpError(res, "INVALID_EMAIL", 400);
            return;
        }

        // Verificar si se proporcionó un nuevo rol
        if (!role) {
            handleHttpError(res, "MISSING_ROLE", 400);
            return;
        }

        // Actualizar el usuario por su email y establecer el nuevo rol
        const updatedUser = await usersModel.findOneAndUpdate(
            { email },
            { role },
            { new: true }
        );

        // Verificar si se encontró y actualizó el usuario correctamente
        if (!updatedUser) {
            handleHttpError(res, "USER_NOT_FOUND", 404);
            return;
        }

        // Enviar respuesta con el usuario actualizado
        res.json({ message: "User role updated successfully", user: updatedUser });

    } catch (err) {

        handleHttpError(res, "UPDATE_FAILED", 500);
    }
};


module.exports = { registerControl, loginControl, updateUser }