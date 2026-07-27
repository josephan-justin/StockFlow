const { User, Product, Category, Supplier, Transaction } = require('../models')

class Controller{
    static async dashboard(req, res){
        try {
            const user = await User.findByPk(req.session.userId)
            const totalProducts = await Product.count()
            const totalCategories = await Category.count()
            const totalSuppliers = await Supplier.count()
            const totalTransactions = await Transaction.count()

            res.render('dashboard', {
                user, 
                totalCategories, 
                totalProducts, 
                totalSuppliers, 
                totalTransactions
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller