const fileUpload = require('express-fileupload')
const parseQuestionnaire = require(`../middleware/parseQuestionnaire`)
const fetchSchema = require(`../middleware/fetchSchema`)
const setUrl = require(`../middleware/setUrl`)
const processRunnerQuestionnaire = require(`../middleware/processRunnerQuestionnaire`)
const processAuthorQuestionnaire = require(`../middleware/processAuthorQuestionnaire`)
const downloadcsv = require(`../middleware/downloadcsv`)
const renderPage = require(`../middleware/renderPage`)

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.render('index.html', { title: "Questionnaire Extract Tool" })
  })

  app.post('/runner-upload',
    fileUpload(),
    parseQuestionnaire,
    processRunnerQuestionnaire,
    renderPage("output.html")
  )

  app.post('/runner-upload-table',
    fileUpload(),
    parseQuestionnaire,
    processRunnerQuestionnaire,
    renderPage("output-table.html")
  )

  app.post('/runner-json',
    parseQuestionnaire,
    processRunnerQuestionnaire,
    renderPage("output.html")
  )

  app.get('/runner-url',
    setUrl,
    fetchSchema,
    processRunnerQuestionnaire,
    renderPage("url.html")
  )

  app.post('/runner-url',
    setUrl,
    fetchSchema,
    processRunnerQuestionnaire,
    renderPage("output.html")
  )

  app.post('/runner-table',
    setUrl,
    fetchSchema,
    processRunnerQuestionnaire,
    renderPage("output-table.html")
  )

  app.get('/author-json',
    parseQuestionnaire,
    processAuthorQuestionnaire,
    renderPage("output.html")
  )

  app.get('/author-url',
    setUrl,
    fetchSchema,
    processAuthorQuestionnaire,
    renderPage("url.html")
  )

  app.post('/author-url',
    setUrl,
    fetchSchema,
    processAuthorQuestionnaire,
    renderPage("output.html")
  )

  app.post('/author-table',
    setUrl,
    fetchSchema,
    processAuthorQuestionnaire,
    renderPage("output-table.html")
  )

  app.post("/download",
    downloadcsv
  )
}
