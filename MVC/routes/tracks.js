
const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, deleteItem } = require("../controllers/tracks")

const checkRol = require("../Middleware/rol")

const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { customHeader } = require("../Middleware/customHeader")

const { authMiddleware } = require("../Middleware/session")

router.get("/", authMiddleware, getItems)

router.get("/:id", validatorGetItem, getItem)

//router.post("/", authMiddleware, validatorCreateItem, createItem)

router.post("/", validatorCreateItem, createItem)

//Otra prueba, para chequear si el usuario es admin
//router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateItem, createItem)

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router