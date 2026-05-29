import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API);

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

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "WA Software Contact Form <onboarding@resend.dev>",
      to: ["darshit@mediaclock.com.au"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Services:</strong> ${servicesText}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${description}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
