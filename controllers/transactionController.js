const { Transaction, TransactionDetail, Product, sequelize } = require("../models")

class Controller{
    static async showTransactions(req, res){
        try {
            const transaction = Transaction.findAll({
                indclude: [
                    {
                        model: User
                    }
                ],
                order: [['date', 'ASC']]
            })

            res.render('transactions/transactions')

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async getStockIn(req, res){
        try {
            const products = await Product.findAll({
                order: [['name', 'ASC']]
            })

            res.render('transactions/transactionForm', {products, type : 'IN'})

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async postStockIn(req, res){
        const tr = await sequelize.transaction()

        try {
            const { ProductId, qty, date } = req.body

            const transaction = await Transaction.create({ 
                type: 'IN',
                date,
                UserId: req.session.userId
            }, {
                transaction: tr
            })

            await TransactionDetail.create({
                TransactionId: transaction.id,
                ProductId,
                qty
            }, {
                transaction: tr
            })

            const product = await Product.findByPk(ProductId, {
                transaction: tr
            })

            await Product.update({
                stock: product.stock + Number(qty)
            }, {
                transaction: tr
            })

            await tr.commit()

            req.flash("success", "Stock In successfully!")
            res.redirect('/transactions')

        } catch (error) {

            await tr.rollback()

            console.log(error)
            res.send(error)
        }
    }
    
    static async getStockOut(req, res){
        try {
            const products = await Product.findAll({
                order: [['name', 'ASC']]
            })

            res.render('transactions/transactionForm', {products, type : 'OUT'})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async postStockOut(req, res){

        const t = await sequelize.transaction()

        try {

            const {
                ProductId,
                qty,
                date
            } = req.body

            const product = await Product.findByPk(ProductId, {
                transaction: t
            })

            if (product.stock < Number(qty)) {
                await t.rollback()

                req.flash("error", "Stock is not enough!")

                return res.redirect("/transactions/stock-out")
            }

            const transaction = await Transaction.create({
                type: "OUT",
                date,
                UserId: req.session.userId
            }, { transaction: t })

            await TransactionDetail.create({
                TransactionId: transaction.id,
                ProductId,
                qty
            }, { transaction: t })

            await product.update({
                stock: product.stock - Number(qty)
            }, {
                transaction: t
            })

            await t.commit()

            req.flash("success", "Stock Out successfully!")
            res.redirect("/transactions")

        } catch (error) {

            await t.rollback()

            console.log(error)
            res.send(error)

        }
    }
    
    static async detail(req, res){
        try {
            const{ id } = req.params

            const transaction = await Transaction.findByPk(id, {
                indclude: [
                    User,{
                        model: TransactionDetail,
                        indclude: [
                            Product
                        ]
                    }
                ]
            })

            if(!transaction){
                throw new Error("Transaction not found")
            }

            res.render('transactions/transactionDetail')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller