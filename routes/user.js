const router = require("express").Router()
const Controller = require("../controllers/userController")
const {isAdmin} = require("../middlewares/authorization")

router.use(isAdmin)

router.get("/", Controller.showUsers)
router.get("/:id/toggle", Controller.toggleStatus)

module.exports = router