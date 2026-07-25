const router = require("express").Router()

router.use("/", require("./auth"))
router.use("/dashboard", require("./dashboard"))
router.use("/categories", require("./category"))
router.use("/suppliers", require("./supplier"))
router.use("/products", require("./product"))
router.use("/transactions", require("./transaction"))

module.exports = router