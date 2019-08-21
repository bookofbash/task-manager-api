var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const sendWelcomeEmail = (email, name) =>{
    transporter.sendMail({
        from: 'harrell.bashir@gmail.com',
        to: email,
        subject: 'Test Email',
        text: `Hi ${name}, thank you for signing up. Let me know what you think`
    }, function(error, info) {
        if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
    })

}

const sendCancelationEmail = (email, name) => {
    transporter.sendMail({
        from: 'harrell.bashir@gmail.com',
        to: email,
        subject: 'We are sorry to see you go!',
        text: `Thank you for using our service, ${name}. Please let us know what we can do to improve`
    }, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    }

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}