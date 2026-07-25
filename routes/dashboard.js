const router = require('express').Router()
const DashboardController = require('../controllers/dashboardController')

router.get('/', DashboardController.home)

module.exports = router