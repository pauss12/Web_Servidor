const express = require("express")
const router = express.Router()

const { getItems, getItem, getUser, deleteItem, updateItem, createUsuario } = require("../controllers/users")

const { validatorGetItem, validatorGetUser, validatorUpdateItem, validatorCreateItem } = require("../validators/users")

//const { uploadMiddlewareUsuario } = require("../utils/handleStorage")

router.get('/', getItems)

router.get('/:id', validatorGetItem, getItem)

/*router.get("/users/:username", validatorGetUser, getUser)*/

router.put('/:id', validatorUpdateItem, updateItem)

/*router.patch("/:id", validatorGetItem, updateItem)*/

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router