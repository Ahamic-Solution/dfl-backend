export const resetPasswordEmailBody = (name: string, resetCode: number) => `
  <html>
    <body style="margin:0; padding:0; background:#f7f1eb; font-family:Arial, Helvetica, sans-serif;">
      <div style="max-width:600px; margin:24px auto; background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #eadfd5;">
        <div style="background:#cf1f2c; padding:34px 28px; color:#ffffff;">
          <h1 style="margin:0; font-size:28px; letter-spacing:0.5px;">ÖZEN ET</h1>
          <p style="margin:8px 0 0; font-size:14px;">Secure account access</p>
        </div>
        <div style="padding:34px 28px; color:#2a1d1b;">
          <h2 style="margin:0 0 14px; font-size:22px;">Password Reset</h2>
          <p style="font-size:16px; line-height:1.7; color:#5f514b;">Hi ${name},</p>
          <p style="font-size:16px; line-height:1.7; color:#5f514b;">
            We received a request to reset the password for your <strong>ÖZEN ET</strong> account. Use this code to continue:
          </p>
          <div style="background:#fff7f3; border:2px solid #eadfd5; border-radius:10px; padding:24px; text-align:center; margin:28px 0;">
            <div style="font-size:38px; color:#cf1f2c; font-weight:800; letter-spacing:6px;">${resetCode || 'XXXXXX'}</div>
          </div>
          <p style="font-size:14px; color:#7a6b64;">
            This code is valid for 10 minutes. If you did not request this change, you can safely ignore this email.
          </p>
          <p style="font-size:15px; color:#5f514b;">Thank you,<br/>The ÖZEN ET Team</p>
        </div>
        <div style="padding:22px 28px; font-size:13px; color:#9a8c84; text-align:center; background:#fbf7f4; border-top:1px solid #eadfd5;">
          <p style="margin:0;">&copy; ${new Date().getFullYear()} ÖZEN ET. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
`;

export default resetPasswordEmailBody;
