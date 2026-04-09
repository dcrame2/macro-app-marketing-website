import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body.' },
      { status: 400 },
    )
  }

  const {
    fullName = '',
    email = '',
    instagram = '',
    tiktok = '',
    youtube = '',
    x = '',
    preferredContact = '',
    notes = '',
    company = '', // honeypot
  } = body

  // Honeypot: silently succeed for bots
  if (company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  if (!fullName.trim() || !email.trim() || !preferredContact.trim()) {
    return NextResponse.json(
      { ok: false, error: 'Name, email, and preferred contact are required.' },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmails = (process.env.PARTNER_NOTIFICATION_EMAIL || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
  const fromEmail = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !toEmails.length || !fromEmail) {
    console.error('Partner form: missing Resend env vars')
    return NextResponse.json(
      { ok: false, error: 'Server is not configured to receive applications yet.' },
      { status: 500 },
    )
  }

  const resend = new Resend(apiKey)

  const rows = [
    ['Name', fullName],
    ['Email', email],
    ['Preferred contact', preferredContact],
    ['Instagram', instagram],
    ['TikTok', tiktok],
    ['YouTube', youtube],
    ['X', x],
    ['Notes', notes],
  ]

  const text = [
    'NEW INSTACAL PARTNER APPLICATION',
    '',
    ...rows.map(([label, value]) => `${label}: ${value || '(none)'}`),
  ].join('\n')

  const renderCell = (value) => {
    if (!value || !String(value).trim()) {
      return '<span style="color:#94a3b8;">(none)</span>'
    }
    return escapeHtml(value)
  }

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New InstaCal Partner Application</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f1f5f9;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">
            <tr>
              <td style="background-color:#0077cc;background-image:linear-gradient(135deg,#0077cc 0%,#00b4e6 100%);padding:36px 40px;">
                <p style="margin:0 0 8px 0;color:rgba(255,255,255,0.85);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">InstaCal Partner Program</p>
                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.2;">New Partner Application</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px 8px 40px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:collapse;">
                  ${rows
                    .map(
                      ([label, value], i) => `
                        <tr>
                          <td style="padding:14px 16px 14px 0;${i < rows.length - 1 ? 'border-bottom:1px solid #e2e8f0;' : ''}width:38%;vertical-align:top;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;">${label}</td>
                          <td style="padding:14px 0;${i < rows.length - 1 ? 'border-bottom:1px solid #e2e8f0;' : ''}color:#0f172a;font-size:15px;line-height:1.5;word-break:break-word;">${renderCell(value)}</td>
                        </tr>
                      `,
                    )
                    .join('')}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px 32px 40px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
                <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">Sent from the InstaCal partner application form.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      replyTo: email,
      subject: `New Partner Application from ${fullName}`,
      text,
      html,
    })

    if (error) {
      console.error('Partner form: Resend error', error)
      return NextResponse.json(
        { ok: false, error: 'Could not send your application. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Partner form: unexpected error', err)
    return NextResponse.json(
      { ok: false, error: 'Could not send your application. Please try again.' },
      { status: 500 },
    )
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
