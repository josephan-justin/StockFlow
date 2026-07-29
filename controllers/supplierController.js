const{ Supplier } = require('../models')

class Controller{
    static async showSuppliers(req, res){
        try {
            const { search } = req.query

            const option = {
                order: [["name","ASC"]]
            }

            if(search){
                option.where={
                    name:{
                        [Op.iLike]:`%${search}%`
                    }
                }
            }

            const suppliers = await Supplier.findAll(option)

            res.render('suppliers/showSuppliers', { suppliers, search })
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async getAdd(req, res){
        try {
            res.render('suppliers/addSupplier')

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postAdd(req, res){
        try {
            const { name, phone, email, address } = req.body
            await Supplier.create({name, phone, email, address})

            res.redirect('/suppliers')

        } catch (error) {

            if (error.name === "SequelizeValidationError") {
                const errors = error.errors.map(el => el.message)
                return res.render("suppliers/addSupplier", {
                    errors
                })
            }

            console.log(error)
            res.send(error)
        }
    }

    static async getEdit(req, res){
        try {
            const { id } = req.params
            const supplier = await Supplier.findByPk(id)

            res.render('suppliers/editSupplier', { supplier })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postEdit(req, res){
        try {
            const { id } = req.params
            const { name, phone, email, address } = req.body

            await Supplier.update({ name, phone, email, address },
                {
                    where: { id }
                }
            )

            res.redirect('/suppliers')

        } catch (error) {
            if (error.name === "SequelizeValidationError") {

                const { id } = req.params

                const supplier = await Supplier.findByPk(id)

                const errors = error.errors.map(el => el.message)

                return res.render("suppliers/editSupplier", {
                    supplier,
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
            await Supplier.destroy({
                where: { id }
            })

            res.redirect('/suppliers')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller