"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerAction(formData: FormData) {
  const names = formData.get("names") as string;
  const phone = formData.get("phone") as string;
  const date = formData.get("date") as string;
  const interest = formData.get("interest") as string;

  if (!names || !phone || !date || !interest) {
    return { error: "All fields are required" };
  }

  try {
    const waPhone = phone.replace(/\D/g, '');
    const waLink = `https://wa.me/${waPhone.startsWith('0') ? '94' + waPhone.substring(1) : waPhone}`;

    const { data, error } = await resend.emails.send({
      from: "Asgard Events <onboarding@resend.dev>",
      to: ["spndilusha@gmail.com"],
      subject: `New Wedding Registration: ${names}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #D4AF37; border-radius: 10px;">
          <h2 style="color: #996515;">New Event Registration</h2>
          <p><strong>Couple's Names:</strong> ${names}</p>
          <p><strong>Contact Number:</strong> ${phone}</p>
          <p><strong>Event Date:</strong> ${date}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <div style="margin-top: 20px;">
            <a href="${waLink}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Message on WhatsApp
            </a>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">This inquiry was sent from the Asgard Events Showcase Website.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: "Failed to send registration. Please try again later." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
