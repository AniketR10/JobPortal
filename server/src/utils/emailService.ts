import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'demouser@ethereal.email', 
    pass: 'demopass'
  }
});



export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    
    if (!process.env.SMTP_EMAIL) {
       const testAccount = await nodemailer.createTestAccount();
       (transporter.options as any).auth = {
         user: testAccount.user,
         pass: testAccount.pass,
       };
       (transporter.options as any).host = 'smtp.ethereal.email';
    }

    const info = await transporter.sendMail({
      from: '"Job Board" <no-reply@jobboard.com>',
      to,
      subject,
      text, 
      html: `<b>${text}</b>`, 
    });

    console.log("Message sent: %s", info.messageId);
    
    if (!process.env.SMTP_EMAIL) {
        console.log("Preview url: %s", nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};