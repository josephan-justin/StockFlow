const router = require("express").Router()

router.get("/", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/dashboard")
    }

    return res.redirect("/login")
})

router.use("/", require("./auth"))
router.use("/dashboard", require("./dashboard"))
router.use("/categories", require("./category"))
router.use("/suppliers", require("./supplier"))
router.use("/products", require("./product"))
router.use("/transactions", require("./transaction"))

module.exports = router