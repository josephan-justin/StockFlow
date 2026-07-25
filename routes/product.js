const router = require('express').Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.showProducts)

router.get('/add', ProductController.getAdd)
router.post('/add', ProductController.postAdd)

router.get('/:id', ProductController.detail)

router.get('/:id/edit', ProductController.getEdit)
router.post('/:id/edit', ProductController.postEdit)

router.get('/:id/delete', ProductController.delete)

module.exports = router