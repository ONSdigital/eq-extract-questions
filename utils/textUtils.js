const parseQuestionText = (questionText) => {
  const parsedText = questionText
    .replace(/metadata/g, "")
    .replace(/answers\[/g, "[")
    .replace(/{{/g, "")
    .replace(/}}/g, "")
    .replace(/']/g, "]")
    .replace(/\['/g, "[")
    .replace(/&apos;/g, "'")
    .replace(/format_date/g, "")
    .replace(/first_non_empty_item/g, "")
    .replace(/format_currency/g, "")
    .replace(/\(\(/g, "(")
    .replace(/\)\)/g, ")")
    .replace(/\|/g, "")
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "")
    .replace(/answer[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/g, "answer")

  return parsedText
}

module.exports = { parseQuestionText }
