
const express = require("express")

const router = express.Router()

const { getComercios, getComercio, createComercio, deleteComercio, updateComercio } = require("../controllers/comercio")

//RUTAS DE LAS LLAMADAS A GET ----------------
router.get("/", getComercios)

router.get("/:id", getComercio)

//RUTAS DE LAS LLAMADAS A POST ----------------
router.post("/", createComercio)

//RUTAS DE LAS LLAMADAS A DELETE ----------------
router.delete("/:id", deleteComercio)

//RUTAS DE LAS LLAMADAS A PUT ----------------
router.put("/:id", updateComercio)

module.exports = router