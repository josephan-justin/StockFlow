const router = require('express').Router()
const ProductController = require('../controllers/productController')
const upload = require("../middlewares/multer")

router.get('/', ProductController.showProducts)

router.get('/add', ProductController.getAdd)
router.post('/add', upload.single("image"),ProductController.postAdd)

router.get('/:id', ProductController.detail)

router.get('/:id/edit', ProductController.getEdit)
router.post('/:id/edit', upload.single("image"),ProductController.postEdit)

router.get('/:id/delete', ProductController.delete)

module.exports = router