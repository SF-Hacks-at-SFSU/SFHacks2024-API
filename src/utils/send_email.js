import nodemailer from "nodemailer";
import dotenv from "dotenv";

//get enviroment configuration
dotenv.config();
import fs from "fs/promises";

/**
 *
 * @param {String} receipient The email address of the receipient receiving the email.
 * @param {String} fName The first name to address in the email
 * @description This function will send a confirmation email to the `receipient`.
 */
export async function sendConfirmedReceivedEmail(receipient, fName) {
  const filePath = "src/assets/received-email.html";
  try {
    //Read the HTML file containing the formatting and format it with our given variables.
    //TODO Implement HTML with AMP4
    let htmlString = await fs.readFile(filePath, "utf8");
    htmlString = htmlString.replace(/\[FIRST NAME\]/g, fName);

    //Authentication for our sending email.
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD_KEY,
      },
    });
    //The message to be sent.
    const mailOptions = {
      from:  {
        name: "SF Hacks Team",
        address: process.env.EMAIL_ACCOUNT,
      },
      to: receipient,
      subject: "We got your application!",
      html: htmlString,
    };

    //Send the email using our authentication. If failed, throw an error.
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        throw "Unable to send email";
      }
    });
  } catch (err) {
    console.error("Error", err);
  }
}
