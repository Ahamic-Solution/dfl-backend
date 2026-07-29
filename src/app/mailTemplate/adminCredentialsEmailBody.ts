const adminCredentialsEmailBody = (
    name: string,
    email: string,
    password: string
) => `
<html>
  <body style="margin:0; padding:0; background:#f7f1eb; font-family:Arial, Helvetica, sans-serif;">
    <div style="max-width:600px; margin:24px auto; background:#ffffff; border-radius:14px; overflow:hidden; border:1px solid #eadfd5;">
      <div style="background:#cf1f2c; padding:30px 28px; color:#ffffff;">
        <h1 style="margin:0; font-size:28px;">ÖZEN ET</h1>
        <p style="margin:8px 0 0; font-size:14px;">Admin dashboard access</p>
      </div>
      <div style="padding:32px 28px; color:#2a1d1b;">
        <h2 style="margin:0 0 14px;">Admin Account Created</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your ÖZEN ET admin account has been created. Use the credentials below to log in.</p>
        <div style="background:#fff7f3; padding:18px; border-radius:10px; border:1px solid #eadfd5;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
        <p style="margin-top:22px; color:#7a6b64;">For security, please change your password after logging in.</p>
      </div>
      <div style="padding:22px 28px; font-size:13px; color:#9a8c84; text-align:center; background:#fbf7f4;">
        <p style="margin:0;">&copy; ${new Date().getFullYear()} ÖZEN ET. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

export default adminCredentialsEmailBody;
