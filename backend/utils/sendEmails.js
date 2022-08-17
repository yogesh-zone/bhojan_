const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

exports.sendEmail = async (mail)=>{

    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_KEY,
        }
    }
    const transport = nodemailer.createTransport(sgTransport(options))
    const message = {
        to:mail.email,
        from: process.env.ADMIN_EMAIL,
        subject:mail.subject,
        text: mail.message
    }
    await transport.sendMail(message);
    console.log("mail send successfully");
}

