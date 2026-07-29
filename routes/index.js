const router = require("express").Router()
const {isLoggedIn} = require('../middlewares/authorization')

router.get("/", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/dashboard")
    }

    return res.redirect("/login")
})

router.use("/", require("./auth")) // login & register

router.use(isLoggedIn)

router.use("/", require("./auth"))
router.use("/dashboard", require("./dashboard"))
router.use("/categories", require("./category"))
router.use("/suppliers", require("./supplier"))
router.use("/products", require("./product"))
router.use("/transactions", require("./transaction"))
router.use("/users", require("./user"))

module.exports = router