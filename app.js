const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')

const router = require('./routes')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.use(session({
  secret: 'stockFLow-secret',
  resave: false,
  saveUninitialized: false
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.userId = req.session.userId
  res.locals.role = req.session.role
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})