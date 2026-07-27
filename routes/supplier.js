const router = require('express').Router()
const SupplierController = require('../controllers/supplierController')

router.get('/', SupplierController.showSuppliers)

router.get('/add', SupplierController.getAdd)
router.post('/add', SupplierController.postAdd)

router.get('/:id/edit', SupplierController.getEdit)
router.post('/:id/edit', SupplierController.postEdit)

router.get('/:id/delete', SupplierController.delete)

module.exports = router