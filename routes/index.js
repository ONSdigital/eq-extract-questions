const express = require('express')
const router = express.Router()
const downloadcsv = require(`../middleware/downloadcsv`)

router.get('/', function (req, res) {
  res.render('index.html', { title: "Questionnaire Extract Tool" })
})

router.post("/download",
  downloadcsv
)

module.exports = router
