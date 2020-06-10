require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require("body-parser")
const setupFilters = require(`./utils/setupFilters`)
const indexRouter = require(`./routes/index`)
const authorRouter = require(`./routes/author`)
const runnerRouter = require(`./routes/runner`)
const app = express()

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
app.use(bodyParser.json({ limit: "10mb" }))
app.use(express.static('static'))
app.use('/', indexRouter)
app.use('/author', authorRouter)
app.use('/runner', runnerRouter)

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app
})

setupFilters(env)

app.listen(3000, () => console.log('Server started on port 3000'))
