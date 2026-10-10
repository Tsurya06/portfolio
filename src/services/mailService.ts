export interface SendEmailPayload {
  readonly name: string;
  readonly email: string;
  readonly subject?: string;
  readonly message: string;
}

export interface SendEmailResult {
  readonly success: boolean;
  readonly message: string;
  readonly fallbackMailto?: string;
}

interface EmailJSConfig {
  readonly serviceId: string;
  readonly templateId: string;
  readonly publicKey: string;
}

function getSubjectLine(payload: SendEmailPayload): string {
  const { name, subject } = payload;
  if (subject && subject.trim().length > 0) {
    return `${subject.trim()} (via Portfolio - ${name})`;
  }
  return `Portfolio Contact from ${name}`;
}

function getEmailJSConfig(): EmailJSConfig | null {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    return { serviceId, templateId, publicKey };
  }
  return null;
}

async function sendViaWeb3Forms(
  payload: SendEmailPayload,
  accessKey: string,
  subject: string
): Promise<SendEmailResult> {
  const { name, email, message } = payload;
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject,
        message,
        from_name: name,
      }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return {
        success: true,
        message: 'Thank you for reaching out! Your message has been sent successfully.',
      };
    }
    return {
      success: false,
      message: data.message || 'Failed to submit message via Web3Forms.',
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Network error while sending message.',
    };
  }
}

async function sendViaEmailJS(
  payload: SendEmailPayload,
  config: EmailJSConfig,
  subject: string
): Promise<SendEmailResult> {
  const { name, email, message } = payload;
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: config.templateId,
        user_id: config.publicKey,
        template_params: {
          from_name: name,
          from_email: email,
          subject,
          message,
          to_name: 'Suryakant Tripathi',
          reply_to: email,
        },
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Thank you for reaching out! Your message has been sent successfully.',
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
      message: err instanceof Error ? err.message : 'Network error while sending message.',
    };
  }
}

function createMailtoFallback(payload: SendEmailPayload, subject: string): SendEmailResult {
  const { name, email, message } = payload;
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailtoUrl = `mailto:suryakant.trip@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

  return {
    success: true,
    message: 'Message ready! Opening your email client to send.',
    fallbackMailto: mailtoUrl,
  };
}

/**
 * Sends a contact message using free browser-compatible email delivery services:
 * 1. Web3Forms (zero-setup free tier, simple access key)
 * 2. EmailJS (popular free tier, 200 emails/month)
 * 3. Graceful fallback to mailto link if no API keys are provided
 */
export async function sendContactEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
  const subjectLine = getSubjectLine(payload);

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (web3FormsKey) {
    return sendViaWeb3Forms(payload, web3FormsKey, subjectLine);
  }

  const emailjsConfig = getEmailJSConfig();
  if (emailjsConfig) {
    return sendViaEmailJS(payload, emailjsConfig, subjectLine);
  }

  return createMailtoFallback(payload, subjectLine);
}
