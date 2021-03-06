if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('../db/db-connection')
const userRouter = require('./router/users')
const blogRouter = require('./router/blog')
const bodyParser = require('body-parser')

// const publicDirPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

const app = express()

// app.use(express.static(publicDirPath))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(blogRouter)
app.use(userRouter)

app.get('*', (req, res) => {
    res.render('404')
})

module.exports = app
