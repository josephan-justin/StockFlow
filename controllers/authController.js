class Controller{
    static async getLogin(req, res){
        try {
            res.render('login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    
    static async postLogin(req, res){
        try {
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async getRegister(req, res){
        try {
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postRegister(req, res){
        try {
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async logout(req, res){
        try {
            res.render('login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller