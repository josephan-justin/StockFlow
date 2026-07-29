const session = require('express-session')
const { User } = require('../models')
const { Op } = require('sequelize')

class Controller{
    static async showUsers(req, res){
        try {
            const { search } = req.query

            const option = {
                order: [['name', 'ASC']]
            }

            if(search){
                option.where = {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${search}%`
                            }
                        },{
                            email: {
                                [Op.iLike]: `%${search}%`
                            }
                        }
                    ]
                }
            }

            const users = await User.findAll(option)
            
            res.render('users/users', {search, users, session: req.session})

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async toggleStatus(req, res){
        try {

            const { id } = req.params

            if (Number(id) === req.session.userId) {
                req.flash("error", "You cannot deactivate your own account.")
                return res.redirect("/users")
            }

            const user = await User.findByPk(id)

            if (!user) {
                throw new Error("User not found")
            }

            await user.update({
                isActive: !user.isActive
            })

            req.flash(
                "success",
                `User ${user.isActive ? "activated" : "deactivated"} successfully`
            )

            res.redirect("/users")

        } catch (error) {

            console.log(error)
            req.flash("error", error.message)
            res.redirect("/users")
        }
    }

}

module.exports = Controller