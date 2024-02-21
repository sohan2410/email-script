const ejs = require("ejs")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()

const sendMail = async (companies, template) => {
  const nodemailer = require("nodemailer")
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    pool: true,
    auth: {
      user: process.env.SMTP_GOOGLE_EMAIL,
      pass: process.env.SMTP_GOOGLE_PASSWORD,
    },
  })

  for (let company of companies) {
    try {
      console.log(company)
      const data = await ejs.renderFile(path.join(__dirname, "templates", template + ".ejs"), {
        name: process.env.NAME,
        school: process.env.SCHOOL,
        contact: process.env.CONTACT,
        company: company.Company,
        receiver: company.Name.split(".")[0],
        resumeUrl: process.env.RESUME_URL,
        githubUrl: process.env.GITHUB_URL,
        linkedinUrl: process.env.LINKEDIN_URL,
        applicationUrl: company.ApplicationUrl,
      })
      let info = await transporter.sendMail({
        from: `"${process.env.NAME}" <${process.env.SMTP_GOOGLE_EMAIL}>`, // sender address
        to: company.Email, // list of receivers
        subject:
          template === "mail"
            ? "Application: Software Engineer Intern Role"
            : "Application for referral for Software Engineering Intern, at " + company.Company, // Subject line
        html: data, // html body
      })
      console.log("Message sent: %s", info.messageId)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = sendMail
