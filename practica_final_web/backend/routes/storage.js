const express = require("express")

const router = express.Router();

const uploadMiddleware = require("../utils/handleStorage")

const { validatorGetPaginaComercio } = require("../validators/paginaComercio")

const { createItem } = require("../controllers/storage")

router.post("/photos/:id", uploadMiddleware.single("image"), validatorGetPaginaComercio, createItem)

module.exports = router