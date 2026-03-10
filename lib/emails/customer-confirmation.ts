export interface InquiryData {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  accommodation: string;
  message?: string;
}

export function renderCustomerEmail(data: InquiryData): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ihre Anfrage beim Sonnenhof</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F0;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F0;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">

        <!-- Header -->
        <tr>
          <td style="background-color:#2C4F40;padding:32px 40px;text-align:center;">
            <h1 style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;margin:0;letter-spacing:2px;">
              SONNENHOF
            </h1>
            <p style="color:#C59D5F;font-size:14px;margin:8px 0 0;letter-spacing:1px;">
              Herrsching am Ammersee
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="color:#2C4F40;font-family:Georgia,'Times New Roman',serif;font-size:22px;margin:0 0 16px;">
              Vielen Dank f&uuml;r Ihre Anfrage, ${escapeHtml(data.name)}!
            </h2>
            <p style="color:#1A1A1A;font-size:16px;line-height:1.6;margin:0 0 24px;">
              Wir haben Ihre Anfrage erhalten und freuen uns &uuml;ber Ihr Interesse am Sonnenhof.
              Wir pr&uuml;fen Ihren Wunschtermin und melden uns pers&ouml;nlich bei Ihnen.
            </p>

            <!-- Anfrage-Zusammenfassung -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
              <tr><td style="background-color:#F5F5F0;border-radius:8px;padding:24px;">
                <h3 style="color:#2C4F40;font-family:Georgia,'Times New Roman',serif;font-size:18px;margin:0 0 16px;border-bottom:2px solid #C59D5F;padding-bottom:8px;">
                  Ihre Anfrage im &Uuml;berblick
                </h3>
                <table width="100%" cellpadding="4" cellspacing="0">
                  <tr>
                    <td style="color:#1A1A1A;font-weight:bold;width:40%;padding:8px 0;border-bottom:1px solid #e0e0dc;">Anreise:</td>
                    <td style="color:#1A1A1A;padding:8px 0;border-bottom:1px solid #e0e0dc;">${escapeHtml(data.checkIn)}</td>
                  </tr>
                  <tr>
                    <td style="color:#1A1A1A;font-weight:bold;padding:8px 0;border-bottom:1px solid #e0e0dc;">Abreise:</td>
                    <td style="color:#1A1A1A;padding:8px 0;border-bottom:1px solid #e0e0dc;">${escapeHtml(data.checkOut)}</td>
                  </tr>
                  <tr>
                    <td style="color:#1A1A1A;font-weight:bold;padding:8px 0;border-bottom:1px solid #e0e0dc;">G&auml;ste:</td>
                    <td style="color:#1A1A1A;padding:8px 0;border-bottom:1px solid #e0e0dc;">${data.adults} Erwachsene${data.children > 0 ? `, ${data.children} Kinder` : ''}</td>
                  </tr>
                  <tr>
                    <td style="color:#1A1A1A;font-weight:bold;padding:8px 0;${data.message ? 'border-bottom:1px solid #e0e0dc;' : ''}"">Unterkunft:</td>
                    <td style="color:#1A1A1A;padding:8px 0;${data.message ? 'border-bottom:1px solid #e0e0dc;' : ''}">${escapeHtml(data.accommodation)}</td>
                  </tr>${data.message ? `
                  <tr>
                    <td style="color:#1A1A1A;font-weight:bold;padding:8px 0;vertical-align:top;">Nachricht:</td>
                    <td style="color:#1A1A1A;padding:8px 0;">${escapeHtml(data.message)}</td>
                  </tr>` : ''}
                </table>
              </td></tr>
            </table>

            <p style="color:#1A1A1A;font-size:16px;line-height:1.6;margin:0 0 8px;">
              Bei Fragen erreichen Sie uns jederzeit:
            </p>
            <p style="color:#1A1A1A;font-size:16px;line-height:1.6;margin:0 0 24px;">
              Telefon: <a href="tel:+4981529679300" style="color:#2C4F40;text-decoration:none;">+49 (0) 8152 / 96793-0</a><br>
              E-Mail: <a href="mailto:sonnenhof@sonnenhof-herrsching.de" style="color:#2C4F40;text-decoration:none;">sonnenhof@sonnenhof-herrsching.de</a>
            </p>

            <p style="color:#1A1A1A;font-size:16px;line-height:1.6;margin:0;">
              Herzliche Gr&uuml;&szlig;e vom Ammersee,<br>
              <strong style="color:#2C4F40;">Ihre Conny vom Sonnenhof</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#2C4F40;padding:24px 40px;text-align:center;">
            <p style="color:#ffffff;font-size:13px;margin:0;line-height:1.5;">
              Sonnenhof Herrsching &middot; Summerstra&szlig;e 23 &middot; 82211 Herrsching am Ammersee
            </p>
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:8px 0 0;">
              <a href="https://www.sonnenhof-herrsching.de" style="color:#C59D5F;text-decoration:none;">
                www.sonnenhof-herrsching.de
              </a>
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
