import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "senddemomails@yahoo.com",
//     pass:"SecurePassword123@",
//   },
// });

const transporter = nodemailer.createTransport({
    service: 'yahoo', // Specify the email service
    auth: {
      user: 'senddemomails@yahoo.com',
      pass: 'SecurePassword123@', // Use your actual Yahoo email password or an app-specific password
    },
  });

// async..await is not allowed in global scope, must use a wrapper
export async function sendLoginMails() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Prerana Rath 👻" <senddemomails@yahoo.com>', // sender address
    to: "adminbookify@yopmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Welcome To Bookify?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}