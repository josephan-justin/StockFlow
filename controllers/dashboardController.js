class Controller{
    static async dashboard(req, res){
        try {
            res.render('dashboard')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller