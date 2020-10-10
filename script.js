const csv = require("csv-parser");
const fs = require("fs");
const path = require('path');
const gm = require("gm").subClass({ imageMagick: true });
const sendMail = require("./mail.js");

// 配置数据与模版
const DATA_FILE = "data.csv";
const TEMPLATE_IMAGE = "template.png"

let dataFile = path.resolve(__dirname, DATA_FILE)
let templateImage = path.resolve(__dirname, TEMPLATE_IMAGE)

// Read csv data
fs.createReadStream(dataFile)
    .pipe(csv())
    .on("data", (row) => {
        // console.log(row);

        let name = row.name,
        department = row.department,
        title = row.title,
        tutor = row.tutor,
        level = row.level,
        mail = row.mail;

        let imagePath = path.resolve(__dirname, "images/", `${name}.jpg`);

        console.log(`【${name}】开始处理`)

        // Generate image
        gm(templateImage)
        .font(path.resolve(__dirname, "SourceHanSansSC-Bold.otf"))
        .fill("#FFE157")
        .fontSize(64)
        .drawText(320, 300, name)
        .fill("#FFFFFF")
        .fontSize(48)
        .drawText(300, 1886, department)
        .drawText(900, 1886, title)
        .drawText(300, 2002, tutor)
        .drawText(900, 2002, level)
        .setFormat("jpg")
        .write(imagePath, function (err) {
            if (!err) console.log(`【${name}】的海报已生成`)

            // Send mail
            sendMail(mail, imagePath);
        });
    })
    .on("end", () => {
        console.log("数据已全部读取...");
    });
