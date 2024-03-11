
const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, deleteItem } = require("../controllers/tracks")

const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { customHeader } = require("../Middleware/customHeader")

router.get("/", getItems)

router.get("/:id", validatorGetItem, getItem)

router.post("/", validatorCreateItem, customHeader, createItem)

router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router