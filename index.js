const ejs = require("ejs");
const fs = require("fs");
const { parse } = require("csv-parse");
const dotenv = require("dotenv");
dotenv.config();

const info = require("./mailInfo.json");

const sendMail = async () => {
  const nodemailer = require("nodemailer");
  const fileContent = fs.readFile(
    __dirname + "/YC_companies.csv",
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const data1 = data.split("\r\n");
      let arr = [];
      for (var i = 1; i < data1.length; i++) {
        let entry = data1[i].split(",");
        arr.push({
          company: entry[0],
          name: entry[1],
          email: entry[2],
        });
      }
      arr = JSON.stringify(arr);
      // console.log(arr);

      fs.writeFileSync("mailInfo.json", arr, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });

      return data;
    }
  );

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "poorvivaish47@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  info.map(async (entry) => {
    const data = await ejs.renderFile("./mail.ejs", {
      name: "Poorvi Vaish",
      school: "IIITM Gwalior",
      contact: process.env.CONTACT,
      company: entry.company,
      receiver: entry.name,
      jhaiho: "https://jhaiho.com/",
      careervira: "https://www.careervira.com/",
      resumeUrl:
        "https://drive.google.com/file/d/1CWyItbyRHNGJjk3YJBpY8xN_yh4JBW3C/view?usp=share_link",
      githubUrl: "https://github.com/poorvi-vaish",
      linkedinUrl: "https://www.linkedin.com/in/poorvi-vaish/",
    });

    // send mail with defined transport object

      let info = await transporter.sendMail({
        from: '"Poorvi Vaish" <poorvivaish47@gmail.com>', // sender address
        to: entry.email, // list of receivers
        subject: "Application: Remote Software Engineer", // Subject line
        html: data, // html body
      });

      console.log("Message sent: %s", info.messageId);
  });
};

sendMail().catch(console.error);
