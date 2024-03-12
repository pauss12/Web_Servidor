const { usersModel } = require('../models/')

const { handleHttpError } = require("../utils/handleError")

const getUsers = async (req, res) => {
    const data = await usersModel.find({})
    res.send(data)
}

const getUser = async (req, res) => {
    const id = req.params.id
    const data = await usersModel.findOne({ name: id })
    res.send(data)
}

const createUser = async (req, res) => {
    const { body } = req
    console.log(body)
    const data = await usersModel.create(body)
    res.send(data)
}

const deleteUser = async (req, res) => {

    try {

        const body = matchedData(req)

        console.log(body)

        const data = await usersModel.create(body)

        res.send(data)
    }
    catch (error) {

        handleHttpError(res, 'ERROR_DELETE_ITEMS');
    }
}

/*const updateUser = async (req, res) => {

    try {

        const body = matchedData(req)

        console.log(body)

        const data = await tracksModel.findOneAndUpdate({ _id: body.user }, body)

        res.send(data)

    }
    catch (error) {

        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }

}*/

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


module.exports = { getUsers, getUser, createUser, deleteUser, changeRole };