import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendQuoteNotification = async (quote) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER, // Send notification to the company email
    subject: 'New Quote Request from Crystal Fabs Website',
    html: `
      <h1>New Quote Request</h1>
      <p><strong>Name:</strong> ${quote.name}</p>
      <p><strong>Phone:</strong> ${quote.phone}</p>
      <p><strong>Category:</strong> ${quote.category}</p>
      <p><strong>Message:</strong> ${quote.message || 'N/A'}</p>
      ${quote.attachments ? `<p><strong>Attachments:</strong> ${quote.attachments}</p>` : ''}
      <p>Please log in to the admin panel to view full details and respond.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Quote notification email sent successfully.');
  } catch (error) {
    console.error('Error sending quote notification email:', error);
  }
};
