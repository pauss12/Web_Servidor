const { usersModel } = require('../models/')

const { handleHttpError } = require("../utils/handleError")

const getUsers = async (req, res) => {

    const data = await usersModel.find({})

    res.send(data)

}

/*const getUser = async (req, res) => {

    const id = req.params.id

    const data = await usersModel.findOne({ name: id })

    res.send(data)
}*/

//OTRA FORMA DE HACER GET USER
const getUser = async (req, res) => {

    try {

        //Me quedo solo con el id
        const { id } = matchedData(req) 

        const data = await usersModel.findById(id)

        res.send(data)

    } catch (err) {

        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

//1ª forma de hacer el "create user";
/*const createUser = async (req, res) => {

    const { body } = req

    //console.log(body)

    const data = await usersModel.create(body)

    res.send(data)
}*/

//ahora lo hacemos con el matched data
const createUser = async (req, res) => {

    //Dato filtrado por el modelo
    const body = matchedData(req)

    //console.log(body)

    const data = await usersModel.create(body)

    res.send(data)
}

const deleteUser = async (req, res) => {

    try {

        const { id } = matchedData(req)

        //console.log(body)

        // "deleteOne" realiza el borrado físico en la BD
        const data = await usersModel.deleteOne({ _id: id }); 

        // "delete" realiza el borrado lógico
        //const data = await tracksModel.delete({_id:id}); 

        res.send(data)
    }
    catch (error) {

        handleHttpError(res, 'ERROR_DELETE_ITEMS');
    }
}

const updateUser = async (req, res) => {

    try {

        //Extrae el id y el resto lo asigna a la constante body 
        const { id, ...body } = matchedData(req)

        //tiene que ser findbyid, porque va buscando el id del objeto que quiere actualizar
        const data = await usersModel.findById(id, body);

        //console.log(data)

        res.send(data)

    } catch (err) {

        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}

const changeRole = async (req, res) => {

    try {

        const id = req.params.id

        console.log(id)

        const user = await usersModel.findOne({ _id: id })

        console.log(user)

        const data = await usersModel.findOneAndUpdate({ _id: id }, { role: "admin" }, { new: true })
        
        console.log(data)
        
        res.send(data)

    }
    catch (error) {

        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }


}


module.exports = { getUsers, getUser, createUser, deleteUser, changeRole, updateUser };