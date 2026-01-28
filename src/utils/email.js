import nodemailer from "nodemailer";
import 'dotenv/config'
// 1. Cria o transporter direto no código
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,    
    pass: process.env.EMAIL_PASS,    
  },
});

//  Função de envio
export const sendConfirmEmail = async (to, token) => {
  const link = `${process.env.APP_URL}/users/confirm_email?token=${token}`;

  await transporter.sendMail({
    from: `"Minha API" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Confirme sua conta",
    text: `Confirme sua conta clicando no link: ${link}`,
  });
};



