const csv = require("csv-parser");
const fs = require("fs");
const gm = require("gm").subClass({ imageMagick: true });
const sendMail = require("./mail.js");

const dataFile = "data.csv";

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

        let imagePath = "images/" + name + ".png";

        console.log(`【${name}】开始处理`)

        // Generate image
        gm("template.png")
        .font("SourceHanSansSC-Bold.otf")
        .fill("#FFE157")
        .fontSize(64)
        .drawText(320, 300, name)
        .fill("#FFFFFF")
        .fontSize(48)
        .drawText(300, 1926, department)
        .drawText(900, 1926, title)
        .drawText(300, 2042, tutor)
        .drawText(900, 2042, level)
        .write(imagePath, function (err) {
            if (!err) console.log(`【${name}】的海报已生成`)

            // Send mail
            sendMail(mail, imagePath);
        });
    })
    .on("end", () => {
        console.log("数据已全部读取...");
    });
