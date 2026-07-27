const router = require("express").Router()
const TransactionController = require("../controllers/transactionController")

router.get("/", TransactionController.showTransactions)

router.get("/stock-in", TransactionController.getStockIn)
router.post("/stock-in", TransactionController.postStockIn)

router.get("/stock-out", TransactionController.getStockOut)
router.post("/stock-out", TransactionController.postStockOut)

router.get("/:id", TransactionController.detail)

module.exports = router