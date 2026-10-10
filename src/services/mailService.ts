export interface SendEmailPayload {
  readonly name: string;
  readonly email: string;
  readonly company?: string;
  readonly opportunityType?: string;
  readonly message: string;
}

export interface SendEmailResult {
  readonly success: boolean;
  readonly message: string;
  readonly fallbackMailto?: string;
}

/**
 * Sends a job opportunity / contact message using free browser-compatible email delivery services:
 * 1. Web3Forms (zero-setup free tier, simple access key)
 * 2. EmailJS (popular free tier, 200 emails/month)
 * 3. Graceful fallback to mailto link if no API keys are provided
 */
export async function sendContactEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const { name, email, company = '', opportunityType = 'Full-Time Role', message } = payload;

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const subjectLine = company
    ? `💼 [Job Offer / ${opportunityType}] from ${company} (${name})`
    : `💼 [Job Opportunity / ${opportunityType}] from ${name}`;

  // 1. Try Web3Forms if configured
  if (web3FormsKey) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name,
          email,
          company: company || 'Not provided',
          opportunity_type: opportunityType,
          message,
          subject: subjectLine,
          from_name: `${name} ${company ? `(${company})` : ''}`,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return {
          success: true,
          message: 'Thank you for reaching out! Your opportunity details have been sent to Suryakant.',
        };
      }
      return {
        success: false,
        message: data.message || 'Failed to submit form via Web3Forms.',
      };
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Network error while sending message.',
      };
    }
  }

  // 2. Try EmailJS if configured
  if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: emailjsServiceId,
          template_id: emailjsTemplateId,
          user_id: emailjsPublicKey,
          template_params: {
            from_name: name,
            from_email: email,
            company,
            opportunity_type: opportunityType,
            message,
            to_name: 'Suryakant Tripathi',
            reply_to: email,
          },
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Thank you for reaching out! Your opportunity details have been sent to Suryakant.',
        };
      }

      const errorText = await response.text();
      return {
        success: false,
        message: errorText || 'Failed to send message via EmailJS.',
      };
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Network error while sending email.',
      };
    }
  }

  // 3. Fallback: mailto link when no provider keys are set in environment
  const subject = encodeURIComponent(subjectLine);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nOpportunity Type: ${opportunityType}\n\nDetails / Job Description:\n${message}`
  );
  const mailtoUrl = `mailto:suryakant.trip@gmail.com?subject=${subject}&body=${body}`;

  return {
    success: true,
    message: 'Message ready! Since direct API keys are not yet set, opening your email app.',
    fallbackMailto: mailtoUrl,
  };
}
