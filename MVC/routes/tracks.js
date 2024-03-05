
const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem } = require("../controllers/tracks")

const { validatorCreateItem, validatorGetItem } = require("../validators/tracks")
const { customHeader } = require("../Middleware/customHeader")

router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)
router.post("/", validatorCreateItem, customHeader, createItem)

module.exports = router