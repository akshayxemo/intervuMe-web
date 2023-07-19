const nodemailer = require('nodemailer');
const sendMail = (toMail, title ,body)=>{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILLER_ID,
                pass: process.env.MAIL_PASS_KEY
            },
            tls: {
                rejectUnauthorized: false
            }
            });

            var mailOptions = {
            from: process.env.MAILLER_ID,
            to: toMail,
            subject: title,
            text: body
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
}

module.exports = sendMail