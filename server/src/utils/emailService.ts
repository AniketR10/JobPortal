import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Job Board" <no-reply@jobboard.com>',
      to,
      subject,
      text,
      html: `<b>${text}</b>`,
    });

    console.log("Email sent: %s", info.messageId);
    console.log("Preview url: %s", nodemailer.getTestMessageUrl(info));
    
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};