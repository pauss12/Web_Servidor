const express = require("express")
const router = express.Router()

const { getItems, getItem, getUser, deleteItem, updateElement, createUsuario } = require("../controllers/users")

const { validatorGetItem, validatorGetUser, validatorUpdateItem, validatorCreateItem } = require("../validators/users")

//const { uploadMiddlewareUsuario } = require("../utils/handleStorage")

router.get('/', getItems)

router.get('/:id', validatorGetItem, getItem)

router.post('/', validatorCreateItem, createUsuario)

/*router.get("/users/:username", validatorGetUser, getUser)*/

router.put("/:id", validatorUpdateItem, updateElement)

/*router.patch("/:id", validatorUpdateItem, )*/

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router