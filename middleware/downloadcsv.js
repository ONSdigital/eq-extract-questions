const { parse, transforms: { unwind } } = require("json2csv")
const { parseQuestionText } = require("../utils/textUtils")
const { reject } = require("lodash")

const get_qcode = (row) => {
  if (row.answers.options && row.answers.options.q_code) {
    return row.answers.options.q_code
  }
  if (row.answers.options && row.answers.options.qCode) {
    return row.answers.options.qCode
  }
  if (row.answers.q_code) {
    return row.answers.q_code
  }
  if (row.answers.qCode) {
    return row.answers.secondaryQCode ? `${row.answers.qCode} / ${row.answers.secondaryQCode}` : row.answers.qCode
  }
}

const fields = [
  {
    label: "Author short code",
    value: (row) => row.alias
  },
  {
    label: "Question",
    value: (row) => parseQuestionText(row.title)
  },
  {
    label: "Type",
    value: (row) => row.answers.type
  },
  {
    label: "Answer label",
    value: (row) => row.answers.secondaryLabel ? `${row.answers.label} / ${row.answers.secondaryLabel}` : row.answers.label
  },
  {
    label: "QCode",
    value: (row) => get_qcode(row)
  },
  {
    label: "Options label",
    value: (row) => row.answers.options ? row.answers.options.label : ""
  }
]

const transforms = [unwind({ paths: ["answers", "answers.options"], blankOut: true })]

module.exports = (req, res) => {
  const questions = reject(JSON.parse(req.body.questions), { pageType: "CalculatedSummaryPage" })
  const data = parse(questions, { fields, transforms })
  res.attachment("questions.csv")

  const parsedText = data
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/&#x27;/gi, "'")
  res.send(parsedText)
}
