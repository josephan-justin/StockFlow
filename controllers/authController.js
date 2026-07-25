const bcrypt = require('bcryptjs')
const { User } = require('../models')

class Controller{
    static async getLogin(req, res){
        try {
            res.render('auth/login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async postLogin(req, res){
        try {
            const {email, password} = req.body
            const user = await User.findByEmail(email)

            if(!user || !user.checkPassword(password)){
                req.flash('error', 'Invalid email/password')
                return res.redirect('/login')
            }

            if(!user.isActive){
                req.flash('error', 'Your account has been deactivated')
                return res.redirect('/login')
            }

            req.session.userId = user.id
            req.session.role = user.role

            return res.redirect('/dashboard')

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async getRegister(req, res){
        try {
            res.render('auth/register')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postRegister(req, res){
        try {
            const { name, email, password } = req.body

            await User.create({ name, email, password, role: 'staff'})

            req.flash('success', 'Registration successfull. Please login.')
            return res.redirect('/login')

        } catch (error) {

            if (
            error.name === "SequelizeValidationError" ||
            error.name === "SequelizeUniqueConstraintError"
            ) {
                const errors = error.errors.map(err => err.message)
                req.flash("error", errors)
                return res.redirect("/register")
            }

            console.log(error)
            res.send(error)
        }
    }

    static async logout(req, res){
        try {
            req.session.destroy((err) => {
                if(err){
                    return res.send(err)
                }
                return res.redirect('/login')
            })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller