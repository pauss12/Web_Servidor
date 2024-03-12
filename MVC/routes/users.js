const express = require("express")
const router = express.Router()
const { getUsers, getUser, createUser } = require("../controllers/users")

const { updateUser, changeRole } = require("../controllers/users")
const { authMiddleware } = require("../Middleware/session")

const { validatorGetItem } = require("../validators/tracks")

const checkRol = require("../Middleware/rol")

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", createUser)

router.put("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, changeRole)

module.exports = router