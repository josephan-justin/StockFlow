const router = require('express').Router()
const DashboardController = require('../controllers/dashboardController')

router.get('/', DashboardController.dashboard)

module.exports = router