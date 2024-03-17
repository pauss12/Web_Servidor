
const express = require("express")

const router = express.Router()

const { getComercios, getComercio, createComercio, deleteComercio, updateComercio } = require("../controllers/comercio")

const { validatorGetItem, validatorCreateItem } = require("../validators/comercio")

//RUTAS DE LAS LLAMADAS A GET ----------------
router.get("/", getComercios)


router.get("/", (req, res) => {

    req.query.orden = "ascendente";
    next();

}, getComercios)

router.get("/:cifComercio", validatorGetItem, getComercio)

//RUTAS DE LAS LLAMADAS A POST ----------------
router.post("/", validatorCreateItem, createComercio)

//RUTAS DE LAS LLAMADAS A DELETE LOGICO----------------
router.delete("/:cifComercio", validatorGetItem, deleteComercio)

//RUTAS DE LAS LLAMADAS A DELETE FISICO----------------

/*
    Esta llamada desde el HTTP seria "DELETE http://localhost:3000/api/comercio/3?logic=true" y el parametro "logic" a "true" es para que se haga un borrado logico
*/
router.delete("/:cifComercio", validatorGetItem, (req, res) => {
    
    req.query.logic = true;
    next();

}, deleteComercio)

/*
    RUTAS DE LAS LLAMADAS A PUT----------------

    En este caso, el parametro que le pasamos por el HTTP es el cif del comercio que queremos actualizar, y el resto de los datos los pasamos en el body del HTTP es para que sepa cuales son los valores que tiene que actualizar.

    Tenemos que pasarle los dos validadores ya que no solamente queremos que pase el validador a la hora de "buscar" ese elemento por su cif, sino tambien a la hora de actualizarlo en la BBDD.
*/
router.put("/:cifComercio", validatorGetItem, validatorCreateItem, updateComercio)

module.exports = router