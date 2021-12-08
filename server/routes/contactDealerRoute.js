const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.post("/", async (req, res) => {
   const {customerDetails, vehicle, dealerEmail} = req.body;

   let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const msg={
    from: '"Test" <dealer@bot.com>', 
    to: `${dealerEmail}`, 
    subject: "Imp: Contact Dealer Request",
    text: `Please find the details:
        ${vehicle}
        ${customerDetails}`,
    html: "<b>Hello Dealer!</b>",
  }

  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.status(200).send("Success");
});

module.exports = router;
