const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const parseQuestionnaire = require(`../middleware/parseQuestionnaire`)
const fetchSchema = require(`../middleware/fetchSchema`)
const setUrl = require(`../middleware/setUrl`)
const processRunnerQuestionnaire = require(`../middleware/processRunnerQuestionnaire`)
const renderPage = require(`../middleware/renderPage`)

router.route('/url')
  .all(
    setUrl,
    fetchSchema,
    processRunnerQuestionnaire
  )
  .get(
    renderPage("output-grid-no-buttons.html")
  )
  .post(
    renderPage("output-grid.html")
  )

router.post('/table',
  setUrl,
  fetchSchema,
  processRunnerQuestionnaire,
  renderPage("output-table.html")
)

router.post('/upload',
  fileUpload(),
  parseQuestionnaire,
  processRunnerQuestionnaire,
  renderPage("output.html")
)

router.post('/upload-table',
  fileUpload(),
  parseQuestionnaire,
  processRunnerQuestionnaire,
  renderPage("output-table.html")
)

router.post('/json',
  parseQuestionnaire,
  processRunnerQuestionnaire,
  renderPage("output.html")
)

module.exports = router
