const nodemailer = require("nodemailer");
const Notification = require("../models/notification.model.js");
const fs = require("fs");

const transporter = nodemailer.createTransport({
    service: "Gmail", // Or your preferred service
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

const EMAIL_HEADER = `
    <div style="background-color: #f9f9f9;">
        <div style="text-align: center; padding: 20px; background-color: #000000; align-items: center;">
            <img src="https://xqbbqrlljllyfijuxiwg.supabase.co/storage/v1/object/public/eatsy/uploads/eatsy-full-white.png" alt="Eatsy Logo" background-color: #000000; style="width: 120px; height: auto; margin-bottom: 10px;" />
            <h1 style="margin: 0; font-size: 11px; color: #333;">Eatsy Notification-Service @ ${new Date().toLocaleString()}</h1>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0 0 0;">
        </div>

`;
const FINAL_DIV = `</div>`;


exports.sendNotification = async (req, res) => {
    const { to, subject, text, html, metadata } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const finalHtml = `${EMAIL_HEADER}${html || ''}${FINAL_DIV}`;
        // Send email first
        await transporter.sendMail({
            from: `"Eatsy Platform Notifications" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html: finalHtml,
        });

        // Save notification log in MongoDB
        const notification = new Notification({
            to,
            subject,
            text,
            metadata
        });

        await notification.save();

        console.log(`Email sent and notification logged for ${metadata?.service || "unknown service"}`);

        res.status(200).json({ message: "Notification sent and saved successfully." });

    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).json({ message: "Failed to send notification." });
    }
};
