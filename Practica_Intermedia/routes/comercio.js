
const express = require("express")

const router = express.Router()

const { getComercios, getComercio, createComercio, deleteComercio, updateComercio } = require("../controllers/comercio")

const { validatorGetItem, validatorCreateItem } = require("../validators/comercio")

//RUTAS DE LAS LLAMADAS A GET ----------------
router.get("/", getComercios)

router.get("/:cifComercio", validatorGetItem, getComercio)

//RUTAS DE LAS LLAMADAS A POST ----------------
router.post("/", validatorCreateItem, createComercio)

//RUTAS DE LAS LLAMADAS A DELETE LOGICO----------------
router.delete("/:cifComercio", validatorGetItem, deleteComercio)

//RUTAS DE LAS LLAMADAS A DELETE FISICO----------------
router.delete("/:cifComercio", validatorGetItem, (req, res) => {
    
    req.query.logic = true;
    next();

}, deleteComercio)

//RUTAS DE LAS LLAMADAS A PUT ----------------
router.put("/:cifComercio", validatorGetItem, validatorCreateItem, updateComercio)

module.exports = router