const router = require('express').Router()
const AuthController = require('../controllers/authController')
const { isGuest, isLoggedIn } = require('../middlewares/authorization')

router.get('/login', isGuest, AuthController.getLogin)
router.post('/login', isGuest, AuthController.postLogin)

router.get('/register', isGuest, AuthController.getRegister)
router.post('/register', isGuest, AuthController.postRegister)

router.get('/logout', isLoggedIn, AuthController.logout)

module.exports = router