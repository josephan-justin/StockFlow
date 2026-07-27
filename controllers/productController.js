const { Product, Category, Supplier } = require('../models')

class Controller{
    static async showProducts(req, res){
        try {
            let products = await Product.findAll({
                include: [ Category, Supplier ],
                order: [['name', 'ASC']]
            })

            res.render('products/showProducts', { products })

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
            const { name, price, stock, imageUrl, CategoryId, SupplierId } = req.body
            await Category.create({ name, price, stock, imageUrl, CategoryId, SupplierId })
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
            const { name, price, stock, imageUrl, CategoryId, SupplierId } = req.body

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