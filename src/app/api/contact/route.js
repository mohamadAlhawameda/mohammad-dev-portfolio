import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: subject || `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fc; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); padding: 32px;">
            <h2 style="color: #1a73e8; margin-bottom: 24px;">📬 New Contact Message</h2>
            <table style="width: 100%; font-size: 16px; color: #333;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td>${subject || '(No subject provided)'}</td></tr>
            </table>
            <hr style="margin: 24px 0;" />
            <p style="font-weight: bold;">Message:</p>
            <div style="background-color: #f1f3f5; border-left: 4px solid #1a73e8; padding: 16px; border-radius: 6px;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
            <p style="margin-top: 32px; font-size: 14px; color: #999;">This message was sent via your portfolio's contact form.</p>
          </div>
        </div>
      `,
    };

    const confirmationMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <div style="background-color: #1a73e8; padding: 24px 32px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Thank You for Contacting Me</h1>
            </div>
            <div style="padding: 32px;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>I’ve received your message and truly appreciate you taking the time to reach out. I’ll get back to you soon.</p>
              <div style="margin: 30px 0;">
                <p><strong>Your Message:</strong></p>
                <div style="background-color: #f1f3f5; border-left: 4px solid #1a73e8; padding: 16px; border-radius: 6px;">
                  ${message}
                </div>
              </div>
              <p>In the meantime, feel free to explore more about my work:</p>
              <div style="margin: 24px 0;">
                <a href="https://linkedin.com/in/mohammad-alhawamdeh" style="display: inline-block; background-color: #0a66c2; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; margin-right: 12px;">LinkedIn</a>
                <a href="https://github.com/mohamadAlhawameda" style="display: inline-block; background-color: #333; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none;">GitHub</a>
              </div>
              <p>Looking forward to connecting with you soon!</p>
              <p style="margin-top: 40px;">
                Warm regards,<br/>
                <strong>Mohammad Alhawamdeh</strong><br/>
                <a href="mailto:alhawameda4@gmail.com">alhawameda4@gmail.com</a><br/>
                <span>Toronto, Canada</span>
              </p>
            </div>
            <div style="background-color: #f9f9f9; padding: 16px 32px; text-align: center; font-size: 13px; color: #999;">
              © ${new Date().getFullYear()} Mohammad Alhawamdeh • All rights reserved
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMail);

    return Response.json({ success: true, message: 'Emails sent successfully.' });
  } catch (err) {
    console.error('❌ Email sending failed:', err);
    return Response.json({ error: 'Something went wrong while sending the emails.' }, { status: 500 });
  }
}
