import type { InquiryData } from './customer-confirmation';

export function renderOwnerNotification(data: InquiryData): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F5F5F0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F0;padding:20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">

        <tr>
          <td style="background-color:#2C4F40;padding:20px 30px;">
            <h1 style="color:#ffffff;font-size:20px;margin:0;font-family:Arial,Helvetica,sans-serif;">
              Neue Anfrage &uuml;ber die Website
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:30px;">
            <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
              <tr style="background-color:#F5F5F0;">
                <td style="font-weight:bold;width:35%;padding:10px;border:1px solid #ddd;">Name:</td>
                <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;padding:10px;border:1px solid #ddd;">E-Mail:</td>
                <td style="padding:10px;border:1px solid #ddd;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color:#2C4F40;">${escapeHtml(data.email)}</a>
                </td>
              </tr>
              <tr style="background-color:#F5F5F0;">
                <td style="font-weight:bold;padding:10px;border:1px solid #ddd;">Anreise:</td>
                <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(data.checkIn)}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;padding:10px;border:1px solid #ddd;">Abreise:</td>
                <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(data.checkOut)}</td>
              </tr>
              <tr style="background-color:#F5F5F0;">
                <td style="font-weight:bold;padding:10px;border:1px solid #ddd;">Erwachsene:</td>
                <td style="padding:10px;border:1px solid #ddd;">${data.adults}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;padding:10px;border:1px solid #ddd;">Kinder:</td>
                <td style="padding:10px;border:1px solid #ddd;">${data.children}</td>
              </tr>
              <tr style="background-color:#F5F5F0;">
                <td style="font-weight:bold;padding:10px;border:1px solid #ddd;">Unterkunft:</td>
                <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(data.accommodation)}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;padding:10px;border:1px solid #ddd;vertical-align:top;">Nachricht:</td>
                <td style="padding:10px;border:1px solid #ddd;">${data.message ? escapeHtml(data.message) : '<em style="color:#999;">Keine Nachricht</em>'}</td>
              </tr>
            </table>

            <p style="margin:20px 0 0;color:#666;font-size:13px;">
              Auf diese E-Mail antworten, um direkt an <strong>${escapeHtml(data.email)}</strong> zu schreiben.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
