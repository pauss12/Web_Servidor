const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSigUser = async (user) => {
    
    const sign = jwt.sign(
        {
            _id: user._id,
            email: user.emailUsuario,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

/*
    Token signer del comercio
*/
const tokenSigComercio = async (comercio) => {

    const sign = jwt.sign(
        {
            _id: comercio._id,
            email: comercio.emailComercio,
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

/**
 * Token se sesión
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (err) {
        console.log(err)
    }
}

module.exports = { tokenSigUser, verifyToken, tokenSigComercio }