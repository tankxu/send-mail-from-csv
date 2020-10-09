// 封装邮件发送接口
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// 配置发送邮件的邮箱账号
const MAIL_USER = 'xutan@coding.net'
const MAIL_PASSWORD = ''

// 开启一个SMTP连接
let transporter = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com', 
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了SSL
    secure: true, // true for 465, false for other ports
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD
    }
})

// 填写邮件信息
let mailOptions = {
    from: `"CODING" <${MAIL_USER}>`, // 发件人
    to: '', // 收件人通过变量传入
    subject: '欢迎加入 CODING', // 标题
    html: '<div style="text-align: center;"><img src="cid:image" style="width: 100%; max-width: 750px;"></div>',
    attachments: [
        {
            filename: 'mail-img.png',
            path: '',
            cid: 'image',
        }
    ]
};

// 使用前面创建的传输器来发送邮件
let send = function (mail, imgPath) {
    if (mail && imgPath) {
        console.log('开始发送邮件给 ' + mail)
        mailOptions.to = mail;
        mailOptions.attachments[0].path = path.resolve(__dirname, imgPath)
        transporter.sendMail(mailOptions, (error, info) => {
            mailOptions.text = '';
            mailOptions.html = '';
            console.log(`Message: ${info.messageId}`);
            console.log(`sent: ${info.response}`);
        })
    }
};



// 将send方法通过exports暴露出来, 便于其他模块调用
module.exports = send;

// 测试发送邮件
// send('邮箱地址', '海报路径')