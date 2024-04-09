const express = require("express")
const router = express.Router()

const { getItems, getItem, getUser, deleteItem, updateItem } = require("../controllers/users")
const { validatorGetItem, validatorGetUser, validatorGetEmail, validatorUpdateItem } = require("../validators/users")
const { uploadMiddlewareUsuario } = require("../utils/handleStorage")

router.get("/", getItems)

router.get("/getUserId/:id", validatorGetItem, getItem)

router.get("/user/:username", validatorGetUser, getUser)

router.put("/:id", validatorUpdateItem, updateItem)

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router