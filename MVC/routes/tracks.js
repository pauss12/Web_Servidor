
const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem } = require("../controllers/tracks")

const {validatorCreateItem} = require("../validators/tracks")
const { customHeader } = require("../Middleware/customHeader")

router.get("/", getItems)
router.get("/:id", getItem)
router.post("/", validatorCreateItem, customHeader, createItem)
module.exports = router