const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.get('/', CategoryController.showCategories)

router.get('/add', CategoryController.getAdd)
router.post('/add', CategoryController.postAdd)

router.get('/:id/edit', CategoryController.getEdit)
router.post('/:id/edit', CategoryController.postEdit)

router.get('/:id/delete', CategoryController.delete)

module.exports = router