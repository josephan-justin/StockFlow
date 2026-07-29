const{ Category } = require('../models')

class Controller{
    static async showCategories(req, res){
        try {
            const { search } = req.query

            const option = {
                order: [["name", "ASC"]]
            }

            if (search) {
                option.where = {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            const categories = await Category.findAll(option)

            res.render('categories/categories', {categories, search})
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async getAdd(req, res){
        try {
            res.render('categories/addCategory')
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

            if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map(el => el.message)
            return res.render("categories/addCategory", { errors })
            }

            console.log(error)
            res.send(error)
        }
    }

    static async getEdit(req, res){
        try {
            const { id } = req.params

            const category = await Category.findByPk(id)

            res.render("categories/editCategory", { category })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postEdit(req, res){
        try {
            const { id } = req.params
            const { name } = req.body

            await Category.update(
                { name },
                {
                    where :{ id }
                }
            )

            res.redirect('/categories')
            
        } catch (error) {
            if (error.name === "SequelizeValidationError") {

            const category = await Category.findByPk(req.params.id)
            const errors = error.errors.map(el => el.message)

            return res.render("categories/editCategory", {
                category,
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
            await Category.destroy({
                where:{ id }
            })

            res.redirect('/categories')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller