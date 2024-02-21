const csv = require("csvtojson")
const fs = require("fs")
const path = require("path")
const readline = require("readline")
const sendMail = require("./sendMail")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question("What is csv filename? (Press Enter for default: default.csv): ", (csvFileName) => {
  csvFileName = csvFileName.trim() || "default.csv"
  rl.question("What is mail template filename? (Press Enter for default: mail.ejs): ", (mailTemplate) => {
    mailTemplate = mailTemplate.trim() || "mail"
    start(csvFileName, mailTemplate)
    rl.close()
  })
})

const getCompaniesFromCSV = async (filename) => {
  return await csv().fromFile(path.join(__dirname, filename + ".csv"))
}

const start = async (csvFileName, mailTemplate) => {
  const companies = await getCompaniesFromCSV(csvFileName)
  await sendMail(companies, mailTemplate)
  process.exit(0)
}
