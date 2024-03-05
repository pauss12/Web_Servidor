const { usersModel } = require('../models/nosql/users')

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

        const data = await tracksModel.create(body)

        res.send(data)
    }
    catch (error) {

        handleHttpError(res, 'ERROR_DELETE_ITEMS');
    }
}


module.exports = { getUsers, getUser, createUser, deleteUser };