require('dotenv').config()
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require("body-parser")
const setupFilters = require(`./utils/setupFilters`)
const setupRoutes = require(`./utils/setupRoutes`)
const app = express()

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
app.use(bodyParser.json({ limit: "10mb" }))
app.use(express.static('static'))

const env = nunjucks.configure("views", {
  autoescape: true,
  express: app
})

setupFilters(env)
setupRoutes(app)

app.listen(3000, () => console.log('Server started on port 3000'))
