"use server";

import nodemailder from "nodemailer";

export const onMailer = (email: string) => {
  const transporter = nodemailder.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    to: email,
    subject: "RealTime Support",
    text: `<link href={http://localhost:3000/conversations}> click here to for demo </link>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};
