import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Martivo",
      link: "https://martivo.com",
    },
  });

  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transpoter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mailInfo = {
    from: "test@example.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transpoter.sendMail(mailInfo);
  } catch (error) {
    console.error(
      "Email service failed silently, this might happen due to mismatched credentials. Make sure the Mailtrap credentials in your .env file are correct."
    );
    console.error("Error: ", error);
  }
};

const generateVerificationMail = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to martivo! We\'re very excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we\'d love to help.",
    },
  };
};

const generateResetPasswordMail = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,
      intro:
        "You have received this email because a password reset request for your accountwas received.",
      action: {
        instructions: "Click the button below to reset your password",
        button: {
          color: "#bd224e",
          text: "Reset your password",
          link: resetPasswordUrl,
        },
      },
      outro:
        "If you did not request for password reset, no further action is required on your part.",
    },
  };
};

export { generateVerificationMail, generateResetPasswordMail, sendEmail };
