function isLoggedIn(req, res, next){
    if(!req.session.userId){
        req.session.returnTo = req.originalUrl
        return res.redirect('/login')
    }
    next()
}

function isGuest(req, res, next){
    if(req.session.userId){
        return res.redirect('/dashboard')
    }
    next()
}

function isAdmin(req, res, next){
    if(req.session.role !== 'admin'){
        req.flash('error', "You don't have permission to access this page.")
        return res.redirect('/dashboard')
    }
    next()
}

module.exports = {isLoggedIn, isGuest, isAdmin}