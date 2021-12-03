const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

// return an array of dealership objects
router.post("/", async (req, res) => {
   const {customerDetails, vehicle, dealerEmail} = req.body;
  let info = await transporter.sendMail({
    from: '"Test" <dealer@bot.com>', // sender address
    to: dealerEmail, // list of receivers
    subject: "Imp: Contact Dealer Request", // Subject line
    text: `Please find the details:
        ${vehicle}
        ${customerDetails}`, // plain text body
    html: "<b>Hello Dealer!</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).send("Success");
});

module.exports = router;
