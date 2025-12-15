import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let resendClient: Resend | null = null;

function getResendClient() {
    if (!resendClient && process.env.RESEND_API_KEY) {
        resendClient = new Resend(process.env.RESEND_API_KEY);
    }
    return resendClient;
}

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
    if (!process.env.RESEND_API_KEY) {
        console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}`);
        return { id: 'mock-id' };
    }

    const resend = getResendClient();
    if (!resend) {
        console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}`);
        return { id: 'mock-id' };
    }

    try {
        const data = await resend.emails.send({
            from: 'DigiShop <onboarding@resend.dev>', // Default for testing, change to verified domain in production
            to: [to],
            subject: subject,
            html: html,
        });
        console.log("Email sent successfully:", data);
        return data;
    } catch (error) {
        console.error("Failed to send email:", error);
        return null; // Don't throw to avoid breaking the flow
    }
}

export async function sendWhatsApp({ to, message }: { to: string, message: string }) {
    // Mock implementation
    console.log(`[MOCK WA] To: ${to}, Message: ${message}`);
    return { success: true, message: 'Mock WhatsApp sent' };
}

