import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { selectedServices, name, companyName, email, phone, description } =
      body;

    // Server-side validation
    if (!name || !companyName || !email || !description) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    // Format the services list
    const servicesText =
      selectedServices && selectedServices.length > 0
        ? selectedServices.join(", ")
        : "Not specified";

    const message = {
      from: process.env.SMTP_EMAIL,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 12px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <h2 style="color: #111827; margin-top: 0; margin-bottom: 24px; font-size: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
              New Contact Inquiry
            </h2>
            
            <div style="margin-bottom: 20px;">
              <p style="margin: 0 0 10px; font-size: 15px; color: #4b5563;">
                <strong style="color: #111827; display: inline-block; width: 100px;">Name:</strong> 
                ${name}
              </p>
              <p style="margin: 0 0 10px; font-size: 15px; color: #4b5563;">
                <strong style="color: #111827; display: inline-block; width: 100px;">Company:</strong> 
                ${companyName || "N/A"}
              </p>
              <p style="margin: 0 0 10px; font-size: 15px; color: #4b5563;">
                <strong style="color: #111827; display: inline-block; width: 100px;">Email:</strong> 
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </p>
              <p style="margin: 0 0 10px; font-size: 15px; color: #4b5563;">
                <strong style="color: #111827; display: inline-block; width: 100px;">Phone:</strong> 
                ${phone || "Not provided"}
              </p>
              <p style="margin: 0 0 10px; font-size: 15px; color: #4b5563;">
                <strong style="color: #111827; display: inline-block; width: 100px;">Services:</strong> 
                <span style="background-color: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 9999px; font-size: 13px; font-weight: 500;">${servicesText}</span>
              </p>
            </div>

            <div style="margin-top: 30px;">
              <h3 style="color: #111827; font-size: 16px; margin-bottom: 12px;">Message:</h3>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${description}</div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                This email was generated from your website's contact form.
              </p>
            </div>
          </div>
        </div>
      `,
      headers: {
        "X-Entity-Ref-Id": "contact-form-submission",
      },
    };

    const acknowledgementMessage = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: `Thank you for contacting us, ${name}!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 12px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <h2 style="color: #111827; margin-top: 0; margin-bottom: 24px; font-size: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
              Thank you for reaching out!
            </h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Hi ${name},
            </p>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              We have received your message and our team will get back to you as soon as possible.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                This is an automated message confirming receipt of your inquiry.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    try {
      await Promise.all([
        transporter.sendMail(message),
        transporter.sendMail(acknowledgementMessage),
      ]);

      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
