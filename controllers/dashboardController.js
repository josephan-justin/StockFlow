const { User, Product, Category, Supplier, Transaction } = require('../models')
const { Op } = require('sequelize')

class Controller{
    static async dashboard(req, res){
        try {
            const user = await User.findByPk(req.session.userId)
            const totalProducts = await Product.count()
            const totalCategories = await Category.count()
            const totalSuppliers = await Supplier.count()
            const totalTransactions = await Transaction.count()

            const lowStock = await Product.count({
                where: {
                    stock: {
                        [Op.lte]: 5
                    }
                }
            })

            res.render('dashboard', {
                user, 
                totalCategories, 
                totalProducts, 
                totalSuppliers, 
                totalTransactions,
                lowStock
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller