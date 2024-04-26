const { handleHttpError } = require("../utils/handleError")

const JWT_SECRET = process.env.JWT_SECRET

const checkRol = (roles) => (req, res, next) => {

    try {

        const { user } = req

        const userRol = user.role

        const checkValueRol = roles.includes(userRol)

        if (!checkValueRol) {

            handleHttpError(res, "NOT_ALLOWED", 403)
            return ;
        }

        next()

    } catch (err) {

        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

//Checkear que el comercio que se va a editar sea del comercio propio
const checkearComercio = (req, res, next) => {

    console.log("checkearComercio")
    
    try {
        
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);

        console.log('decoded:', decoded);


        // Obtener el email del comercio de la base de datos
        const emailBBDD = req.user.email;

        console.log('emailBBDD:', emailBBDD);

        // Comparar el email del token con el email de la base de datos
        if (decoded.email === emailBBDD)
            return true; 
        else
            return false; 

    } catch (error) {
        // Manejar errores de verificación del token
        console.error('Error al verificar el token:', error);
        return false;
    }
}

module.exports = { checkRol, checkearComercio }