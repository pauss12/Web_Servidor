
const express = require("express")

const router = express.Router()

const { getComercios, getComercio, createComercio } = require("../controllers/comercio")


router.get("/", getComercios)
router.get("/:id", getComercio)
router.post("/", createComercio)

module.exports = router