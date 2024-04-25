const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
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

module.exports = { tokenSign, verifyToken }