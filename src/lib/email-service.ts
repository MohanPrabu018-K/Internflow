// ─── Email Service ───────────────────────────────────────────────────────
// Uses Resend (resend.com) for transactional emails with SMTP fallback.

interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ─── Resend Provider ─────────────────────────────────────────────────────

async function sendViaResend(options: EmailOptions): Promise<EmailResult> {
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: options.from || process.env.EMAIL_FROM || "noreply@internflow.com",
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html || "",
      text: options.text,
      replyTo: options.replyTo,
    } as any);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

// ─── SMTP Fallback (optional — requires npm install nodemailer @types/nodemailer) ─
// To enable SMTP, install: npm install nodemailer && npm install -D @types/nodemailer
// Then uncomment the implementation below.

async function sendViaSmtp(_options: EmailOptions): Promise<EmailResult> {
  return { success: false, error: "SMTP not configured. Install nodemailer for SMTP support." };
}

// ─── Template Builders ───────────────────────────────────────────────────

export const EmailTemplates = {
  accountVerification(verificationLink: string, userName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto;">
        <h2 style="color: #1E293B;">Welcome to InternFlow, ${userName}!</h2>
        <p style="color: #475569;">Please verify your email address to get started.</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background: #2563EB; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #94A3B8; font-size: 12px;">If you didn't create this account, you can safely ignore this email.</p>
      </div>
    `;
  },

  passwordReset(resetLink: string, userName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto;">
        <h2 style="color: #1E293B;">Password Reset Request</h2>
        <p style="color: #475569;">Hi ${userName}, we received a request to reset your password.</p>
        <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #2563EB; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #94A3B8; font-size: 12px;">This link expires in 1 hour. If you didn't request this, please ignore.</p>
      </div>
    `;
  },

  interviewInvitation(
    candidateName: string,
    role: string,
    date: string,
    platform: string,
    meetingLink: string
  ): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto;">
        <h2 style="color: #1E293B;">Interview Invitation</h2>
        <p style="color: #475569;">Dear ${candidateName},</p>
        <p style="color: #475569;">You have been invited for an interview for the <strong>${role}</strong> position.</p>
        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Date:</strong> ${date}</p>
          <p style="margin: 4px 0;"><strong>Platform:</strong> ${platform}</p>
          <p style="margin: 4px 0;"><strong>Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
        </div>
        <p style="color: #475569;">Best of luck!</p>
      </div>
    `;
  },

  offerLetter(candidateName: string, role: string, stipend: string, startDate: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto;">
        <h2 style="color: #059669;">Offer Letter</h2>
        <p style="color: #475569;">Dear ${candidateName},</p>
        <p style="color: #475569;">Congratulations! We are pleased to offer you the position of <strong>${role}</strong>.</p>
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Stipend:</strong> ${stipend}</p>
          <p style="margin: 4px 0;"><strong>Start Date:</strong> ${startDate}</p>
        </div>
        <p style="color: #475569;">Please confirm your acceptance by replying to this email.</p>
      </div>
    `;
  },
};

// ─── Public API ──────────────────────────────────────────────────────────

export const EmailService = {
  async send(options: EmailOptions): Promise<EmailResult> {
    // Try Resend first, fall back to SMTP
    if (process.env.RESEND_API_KEY) {
      const result = await sendViaResend(options);
      if (result.success) return result;
      console.warn("Resend failed, falling back to SMTP:", result.error);
    }

    if (process.env.SMTP_HOST) {
      return sendViaSmtp(options);
    }

    // Development: log to console
    if (process.env.NODE_ENV === "development") {
      console.log("\n📧 EMAIL (dev mode):");
      console.log(`   To: ${JSON.stringify(options.to)}`);
      console.log(`   Subject: ${options.subject}`);
      console.log(`   HTML: ${(options.html || options.text || "").slice(0, 200)}...\n`);
      return { success: true, messageId: `dev-${Date.now()}` };
    }

    return { success: false, error: "No email provider configured" };
  },

  /** Send verification email */
  async sendVerification(email: string, token: string, userName: string): Promise<EmailResult> {
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
    return this.send({
      to: email,
      subject: "Verify your InternFlow account",
      html: EmailTemplates.accountVerification(link, userName),
    });
  },

  /** Send password reset */
  async sendPasswordReset(email: string, token: string, userName: string): Promise<EmailResult> {
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
    return this.send({
      to: email,
      subject: "Reset your InternFlow password",
      html: EmailTemplates.passwordReset(link, userName),
    });
  },

  /** Send interview invitation */
  async sendInterviewInvitation(
    email: string,
    candidateName: string,
    role: string,
    date: string,
    platform: string,
    meetingLink: string
  ): Promise<EmailResult> {
    return this.send({
      to: email,
      subject: `Interview Invitation — ${role} at InternFlow`,
      html: EmailTemplates.interviewInvitation(candidateName, role, date, platform, meetingLink),
    });
  },

  /** Send offer letter */
  async sendOfferLetter(
    email: string,
    candidateName: string,
    role: string,
    stipend: string,
    startDate: string
  ): Promise<EmailResult> {
    return this.send({
      to: email,
      subject: `Offer Letter — ${role} at InternFlow`,
      html: EmailTemplates.offerLetter(candidateName, role, stipend, startDate),
    });
  },
};
