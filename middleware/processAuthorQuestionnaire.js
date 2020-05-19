const { flatMap, filter } = require("lodash")

const getAllPages = (questionnaire) => {
  return flatMap(filter(questionnaire.sections, "pages"), "pages")
}
module.exports = (req, res, next) => {
  res.locals.questions = getAllPages(JSON.parse(req.files.jsonFile.data))
  next()
}
