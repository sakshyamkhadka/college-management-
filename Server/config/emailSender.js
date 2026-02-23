import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendAdmissionEmail = async (email, firstName, status) => {
  const collegeName = process.env.COLLEGE_NAME;
  const collegeContact = process.env.COLLEGE_CONTACT;
  const timestamp = new Date().toLocaleString();

  let subject, text;

  if (status === "approved") {
    subject = `Admission Approved – ${collegeName}`;
    text = `Hello ${firstName},\n\n` +
           `We are pleased to inform you that your admission to ${collegeName} has been **approved**.\n\n` +
           `Please visit the college to complete the enrollment process, or contact us for any further information.\n\n` +
           `Admission Approval Date & Time: ${timestamp}\n\n` +
           `We look forward to welcoming you to ${collegeName}.\n\n` +
           `Best regards,\n` +
           `${collegeName} Admission Team\n` +
           `${collegeContact}`;
  } else if (status === "rejected") {
    subject = `Admission Update – ${collegeName}`;
    text = `Hello ${firstName},\n\n` +
           `We regret to inform you that your admission to ${collegeName} has been **rejected**.\n\n` +
           `If you would like to discuss the decision or explore other options, please feel free to contact us.\n\n` +
           `Decision Date & Time: ${timestamp}\n\n` +
           `Thank you for considering ${collegeName}. We wish you success in your future endeavors.\n\n` +
           `Best regards,\n` +
           `${collegeName} Admission Team\n` +
           `${collegeContact}`;
  } else {
    throw new Error("Invalid status for admission email");
  }

  await transporter.sendMail({
    from: `"${collegeName} Admission Team" <${collegeContact}>`,
    to: email,
    subject,
    text,
  });

  console.log(`Email sent to ${email} for status: ${status}`);
};
