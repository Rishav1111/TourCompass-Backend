const nodemailer = require("nodemailer");
const sentEmail = async (email, boilerPlate, subject) => {
  try {
    const mailerConfig = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "shrestharishav3@gmail.com",
        pass: "eskjtepephstbuds",
      },
    };
    const transporter = nodemailer.createTransport(mailerConfig);
    const mailOptions = {
      from: "TourCompass <shrestharishav3@gmail.com>",
      to: email,
      subject: subject,
      html: boilerPlate,
    };
    // console.log(transporter);
    const info = await transporter.sendMail(mailOptions);

    // console.log(process.env.email,process.env.password);
  } catch (error) {
    console.error(error);
  }
};

module.exports = sentEmail;
