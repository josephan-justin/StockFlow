const { Product } = require('../models')

class Controller{
    static async showProducts(req, res){
        try {
            let products = await Product.findAll({
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
            res.render('products/addProduct')
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postAdd(req, res){
        try {
            const { name } = req.body
            await Category.create({ name })
            res.redirect('/categories')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async detail(req, res){
        try {
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async getEdit(req, res){
        try {
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postEdit(req, res){
        try {
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async delete(req, res){
        try {
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

}

module.exports = Controller