const csvFilePath='HiringTeams.csv'
const csv= require('csvtojson')
const fs = require("fs");
const convert = async () => {
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
 
})
 const jsonArray=await csv().fromFile(csvFilePath);
 fs.writeFileSync("mailInfo.json", JSON.stringify(jsonArray), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
        }
    );
}

module.exports = { convert };
