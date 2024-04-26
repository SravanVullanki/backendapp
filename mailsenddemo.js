const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mikemarcus1201@gmail.com', 
        pass: 'dtfqkxdiiqnhcqhc' 
    }
});


let mailOptions = {
    from: '"Paws And Palace" mikemarcus1201@gmail.com',
    to: 'srisravan1201@gmail.com', 
    subject: 'Hello ✔', 
    text: 'Hello world', 
    html: '<b>Hello world?</b>' 
};


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
