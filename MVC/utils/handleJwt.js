const jwt = require("jsonwebtoken")

const getProperties = require("../utils/handlePropertiesEngine")

const propertiesKey = getProperties()

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            //_id: user.id,
            [propertiesKey.id]: user[propertiesKey.id], // [] propiedad dinámica
            email: user.email
        },
        process.env.JWT_SECRET,
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
        return jwt.verify(tokenJwt, process.env.JWT_SECRET)
    } catch (err) {
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken }