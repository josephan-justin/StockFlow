const router = require('express').Router()
const DashboardController = require('../controllers/dashboardController')
const { isLoggedIn } = require('../middlewares/authorization')

router.get('/', DashboardController.dashboard)

module.exports = router