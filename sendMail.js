const info = require("./mailInfo.json");
const ejs = require("ejs");
const dotenv = require("dotenv");
dotenv.config();

const sendMail = async () => {
    const nodemailer = require("nodemailer");

  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      pool: true,
      auth: {
        user: "sejaljain080401@gmail.com",
        pass: process.env.PASSWORD,
      },
    });
  
    info.map(async (entry) => {
      console.log(entry);
      const data = await ejs.renderFile("./mail.ejs", {
        name: 'Sejal Jain',
        school: 'IIITM Gwalior',
        contact: process.env.CONTACT,
        company: entry.Company,
        receiver: entry.Name.split('.')[0],
        ai_monk: "https://aimonks.com/",
        jhaiho: "https://jhaiho.com/",
        maalexi: "https://maalexi.com/",
        resumeUrl: "https://drive.google.com/file/d/1wXyJeZ7SlARgj6w4Aw8elnKV9gDAgvOa/view?usp=sharing",
        githubUrl: 'https://github.com/sejaljain123',
        linkedinUrl: 'https://www.linkedin.com/in/sejaljain2043/'
      });
        let info = await transporter.sendMail({
          from: '"Sejal Jain" <sejaljain080401@gmail.com>', // sender address
          to: entry.Email, // list of receivers
          subject: "Application: Remote Software Engineer", // Subject line
          html: data, // html body
        });
  
        console.log("Message sent: %s", info.messageId);
    });
  };

  module.exports = sendMail;
  