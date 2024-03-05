const bcryptjs = require("bcryptjs")

/**
 * Contraseña sin cifrar
 * @param {*} clearPassword 
 */

// En criptografía, el número o string "Salt" le otorga aleatoriedad a la función hash al combinarla con la password en claro.
const encrypt = async (clearPassword) => {
    const hash = await bcryptjs.hash(clearPassword, 10) 
    return hash
}

/**
 * Pasa contraseña en claro y contraseña cifrada (hashed)
 * @param {*} clearPassword 
 * @param {*} hashedPassword 
 */

// Compara entre la password en texto plano (en claro) y su hash calculado anteriormente para decidir si coincide.
const compare = async (clearPassword, hashedPassword) => { 
    const result = await bcryptjs.compare(clearPassword, hashedPassword)
    return result
}

module.exports = { encrypt, compare }