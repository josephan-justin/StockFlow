const { Product, Category, Supplier } = require('../models')
const { Op } = require('sequelize')

class Controller{
    static async showProducts(req, res){
        try {
            const { search } = req.query

            const option = {
                include: [Category, Supplier],
                order: [["name", "ASC"]]
            }

            if (search) {
                option.where = {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            const products = await Product.findAll(option)

            res.render('products/showProducts', { products, search})

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async getAdd(req, res){
        try {
            const categories = await Category.findAll({
                order: [["name", "ASC"]]
            })

            const suppliers = await Supplier.findAll({
                order: [["name", "ASC"]]
            })
            res.render('products/addProduct', { categories, suppliers })
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postAdd(req, res){
        try {
            const { name, price, stock, CategoryId, SupplierId } = req.body

            const imageUrl = req.file
                ? `/uploads/${req.file.filename}`
                : null

            await Product.create({ name, price, stock, imageUrl, CategoryId, SupplierId })

            res.redirect('/products')

        } catch (error) {
            if (error.name === "SequelizeValidationError") {

                const categories = await Category.findAll({
                    order: [["name", "ASC"]]
                })

                const suppliers = await Supplier.findAll({
                    order: [["name", "ASC"]]
                })

                const errors = error.errors.map(el => el.message)

                return res.render("products/addProduct", {
                    categories,
                    suppliers,
                    errors
                })
            }

            console.log(error)
            res.send(error)
        }
    }

    static async detail(req, res){
        try {
           const { id } = req.params

            const product = await Product.findByPk(id, {
                include: [ Category, Supplier ]
            })

            if (!product) {
                throw { name: "Product Not Found" }
            }

            res.render("products/detailProduct", {
                product
            })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async getEdit(req, res){
        try {
             const { id } = req.params

            await Product.destroy({
                where: { id }
            })

            res.redirect("/products")

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postEdit(req, res){
        try {
            const { id } = req.params

            const { name, price, stock, CategoryId, SupplierId } = req.body

            const product = await Product.findByPk(id)

            const imageUrl = req.file
            ? `/uploads/${req.file.filename}`
            : product.imageUrl

            await Category.update({ name, price, stock, imageUrl, CategoryId, SupplierId },
                {
                    where: { id } 
                }
            )

            res.redirect('/products')

        } catch (error) {
            if (error.name === "SequelizeValidationError") {

                const { id } = req.params

                const product = await Product.findByPk(id)

                const categories = await Category.findAll({
                    order: [["name", "ASC"]]
                })

                const suppliers = await Supplier.findAll({
                    order: [["name", "ASC"]]
                })

                const errors = error.errors.map(el => el.message)

                return res.render("products/editProduct", {
                    product,
                    categories,
                    suppliers,
                    errors
                })
            }
            console.log(error)
            res.send(error)
        }
    }

    static async delete(req, res){
        try {
             const { id } = req.params

            await Product.destroy({
                where: { id }
            })

            res.redirect("/products")
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

}

module.exports = Controller