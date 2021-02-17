const nodemailer = require('nodemailer')
const maai = require("./mail.json")
const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
           // Пожалуйста, используйте свой собственный аккаунт для рассылки
            user: maai.mail, //     user: '********',     (замените звездочики на название вашего почтового ящика)
            pass: maai.password //  pass: '******'     (замените звездочики на пароль вашего почтового ящика)
        }
    },
    {
        from: 'Avrora <maks.babkov@list.ru>', 
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer