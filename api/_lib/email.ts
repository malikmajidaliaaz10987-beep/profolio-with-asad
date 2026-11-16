import type { LeadRecord } from './types.js';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getEmailConfig() {
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim();
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
  const resendFromEmail = (
    process.env.RESEND_FROM_EMAIL || 'Asad Ali Awan Portfolio <onboarding@resend.dev>'
  ).trim();

  return {
    adminEmail,
    resendApiKey,
    resendFromEmail,
  };
}

export async function dispatchEmailNotifications(lead: LeadRecord): Promise<{
  emailConfigured: boolean;
  adminEmailSent: boolean;
  customerEmailSent: boolean;
  emailError?: string;
}> {
  const { adminEmail, resendApiKey, resendFromEmail } = getEmailConfig();

  if (!resendApiKey || !adminEmail) {
    console.log('[Email] Skipping Resend delivery: RESEND_API_KEY or ADMIN_EMAIL is not configured.');
    return {
      emailConfigured: false,
      adminEmailSent: false,
      customerEmailSent: false,
      emailError: !resendApiKey
        ? 'RESEND_API_KEY is not configured.'
        : 'ADMIN_EMAIL is not configured.',
    };
  }

  const submittedAtFormatted = new Date(lead.submissionTimestamp).toUTCString();
  let adminEmailSent = false;
  let customerEmailSent = false;
  const errors: string[] = [];

  // 1. Admin Lead Notification Email
  const adminSubject = `NEW WEBSITE LEAD — ${lead.fullName}`;
  const adminText = `
NEW WEBSITE LEAD — ${lead.fullName}
=========================================
Customer Name: ${lead.fullName}
Email Address: ${lead.email}
Phone / WhatsApp Number: ${lead.phone || 'Not provided'}
Company: ${lead.businessName || 'Not provided'}
Country: ${lead.country}
Website URL: ${lead.website || 'Not provided'}
Selected Service: ${lead.service}
Project Budget: ${lead.budget || 'Not specified'}
Project Timeline: ${lead.timeline || 'Flexible'}
Preferred Contact Method: ${lead.contactPreference}
Submission Date and Time: ${submittedAtFormatted}
Lead ID: ${lead.id}

Complete Message:
${lead.projectDescription}
=========================================
  `.trim();

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: #101827; max-width: 640px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #101827; color: #ffffff; padding: 20px 24px;">
        <h2 style="margin: 0; font-size: 18px;">NEW WEBSITE LEAD — ${escapeHtml(lead.fullName)}</h2>
        <p style="margin: 6px 0 0; font-size: 12px; color: #94a3b8;">Submitted ${escapeHtml(submittedAtFormatted)} · ID: ${escapeHtml(lead.id)}</p>
      </div>
      <div style="padding: 24px; background: #ffffff; font-size: 14px; line-height: 1.6;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 18px;">
          <tr><td style="padding: 6px 0; color: #64748b; width: 170px;"><strong>Customer Name</strong></td><td style="padding: 6px 0;">${escapeHtml(lead.fullName)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Email Address</strong></td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Phone / WhatsApp</strong></td><td style="padding: 6px 0;">${escapeHtml(lead.phone || 'Not provided')}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Company</strong></td><td style="padding: 6px 0;">${escapeHtml(lead.businessName || 'Not provided')}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Country</strong></td><td style="padding: 6px 0;">${escapeHtml(lead.country)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Selected Service</strong></td><td style="padding: 6px 0; color: #1769FF; font-weight: bold;">${escapeHtml(lead.service)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Project Budget</strong></td><td style="padding: 6px 0;">${escapeHtml(lead.budget || 'Not specified')}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Preferred Contact</strong></td><td style="padding: 6px 0;">${escapeHtml(lead.contactPreference)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;"><strong>Submission Time</strong></td><td style="padding: 6px 0;">${escapeHtml(submittedAtFormatted)}</td></tr>
        </table>
        <div style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
          <strong style="display: block; margin-bottom: 6px; font-size: 12px; color: #475569; text-transform: uppercase;">Complete Message</strong>
          <div style="white-space: pre-wrap;">${escapeHtml(lead.projectDescription)}</div>
        </div>
      </div>
    </div>
  `.trim();

  try {
    const adminResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [adminEmail],
        reply_to: lead.email,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
      }),
    });

    if (adminResp.ok) {
      adminEmailSent = true;
    } else {
      const errBody = await adminResp.text();
      errors.push(`Admin email failed (${adminResp.status}): ${errBody}`);
      console.warn('[Resend Admin Email Error]:', adminResp.status, errBody);
    }
  } catch (err: any) {
    errors.push(`Admin email error: ${err?.message || 'Unknown error'}`);
    console.warn('[Resend Admin Email Exception]:', err);
  }

  // 2. Customer Auto-Confirmation Email
  const customerConfirmationLine =
    'Thank you for contacting us! Your inquiry has been successfully received. We appreciate your interest and will get back to you as soon as possible.';

  const customerText = `
Hello ${lead.fullName},

${customerConfirmationLine}

Summary of Your Inquiry:
- Service Interested In: ${lead.service}
- Country: ${lead.country}
- Project Budget: ${lead.budget || 'Not specified'}
- Reference ID: ${lead.id}

Best regards,
Asad Ali Awan
  `.trim();

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; color: #101827; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #101827; color: #ffffff; padding: 20px 24px;">
        <h2 style="margin: 0; font-size: 18px;">Inquiry Confirmation — Asad Ali Awan</h2>
      </div>
      <div style="padding: 24px; background: #ffffff; font-size: 14px; line-height: 1.65;">
        <p style="margin-top: 0;">Hello ${escapeHtml(lead.fullName)},</p>
        <p>${customerConfirmationLine}</p>
        <div style="margin: 18px 0; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px;">
          <div><strong>Service Interested In:</strong> ${escapeHtml(lead.service)}</div>
          <div><strong>Country:</strong> ${escapeHtml(lead.country)}</div>
          <div><strong>Project Budget:</strong> ${escapeHtml(lead.budget || 'Not specified')}</div>
          <div><strong>Reference ID:</strong> ${escapeHtml(lead.id)}</div>
        </div>
        <p style="margin-bottom: 0;">Best regards,<br/><strong>Asad Ali Awan</strong></p>
      </div>
    </div>
  `.trim();

  try {
    const customerResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [lead.email],
        reply_to: adminEmail,
        subject: 'Thank you for contacting Asad Ali Awan — Inquiry Received',
        text: customerText,
        html: customerHtml,
      }),
    });

    if (customerResp.ok) {
      customerEmailSent = true;
    } else {
      const errBody = await customerResp.text();
      errors.push(`Customer confirmation failed (${customerResp.status}): ${errBody}`);
      console.warn('[Resend Customer Email Error]:', customerResp.status, errBody);
    }
  } catch (err: any) {
    errors.push(`Customer email error: ${err?.message || 'Unknown error'}`);
    console.warn('[Resend Customer Email Exception]:', err);
  }

  return {
    emailConfigured: true,
    adminEmailSent,
    customerEmailSent,
    emailError: errors.length > 0 ? errors.join(' | ') : undefined,
  };
}
