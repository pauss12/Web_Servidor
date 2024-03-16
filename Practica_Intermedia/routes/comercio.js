
const express = require("express")

const router = express.Router()

const { getComercios, getComercio, createComercio, deleteComercio, updateComercio } = require("../controllers/comercio")

const { validatorGetItem, validatorCreateItem } = require("../validators/comercio")

//RUTAS DE LAS LLAMADAS A GET ----------------
router.get("/", getComercios)

router.get("/:id", validatorGetItem, getComercio)

//RUTAS DE LAS LLAMADAS A POST ----------------
router.post("/", validatorCreateItem, createComercio)

//RUTAS DE LAS LLAMADAS A DELETE ----------------
router.delete("/:id?logic=:activo", deleteComercio)

//RUTAS DE LAS LLAMADAS A PUT ----------------
router.put("/:id", updateComercio)

module.exports = router