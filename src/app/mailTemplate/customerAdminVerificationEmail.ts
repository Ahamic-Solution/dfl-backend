const customerAdminVerificationEmail = ({
    name,
    status,
    reason,
}: {
    name: string;
    status: 'approved' | 'rejected';
    reason?: string;
}) => {
    const isApproved = status === 'approved';

    return `
  <html>
    <body style="font-family: Arial, sans-serif; background: #f7f1eb; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #eadfd5;">
        <div style="background: ${isApproved ? '#0f9f6e' : '#cf1f2c'}; color: #ffffff; padding: 24px;">
          <h1 style="margin: 0 0 8px; font-size: 26px;">ÖZEN ET</h1>
          <h2 style="margin: 0;">Account ${isApproved ? 'Approved' : 'Rejected'}</h2>
        </div>
        <div style="padding: 24px; color: #2a1d1b;">
          <p>Hello ${name || 'Customer'},</p>
          <p>
            Your customer account has been <strong>${isApproved ? 'approved' : 'rejected'}</strong> by the admin team.
          </p>
          ${
              isApproved
                  ? '<p>You can now continue using your ÖZEN ET account.</p>'
                  : `<p><strong>Reason:</strong> ${reason || 'Please contact support for more information.'}</p>`
          }
          <p>Thank you,<br/>The ÖZEN ET Team</p>
        </div>
      </div>
    </body>
  </html>
`;
};

export default customerAdminVerificationEmail;
