const express = require("express")

const router = express.Router();

const uploadMiddleware = require("../utils/handleStorage")

const { createItem } = require("../controllers/storage")

router.post("/:id", uploadMiddleware.single("image"), createItem)

module.exports = router