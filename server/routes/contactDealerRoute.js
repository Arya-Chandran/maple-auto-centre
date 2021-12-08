const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.post("/", async (req, res) => {
   const {customerDetails, vehicle, dealerEmail} = req.body;
   console.log (customerDetails, vehicle, dealerEmail)

   let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jdegstrcbhfpssir@ethereal.email',
      pass: 't9kbWyJh3vG53w1Mys' 
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
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.status(200).send("Success");
});

module.exports = router;
