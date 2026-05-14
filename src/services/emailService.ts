import emailjs from '@emailjs/browser';

interface EmailConfig {
  serviceId: string;
  publicKey: string;
}

function getConfig(): EmailConfig | null {
  const settings = JSON.parse(localStorage.getItem('site_settings') || '{}');
  if (!settings.emailjsServiceId || !settings.emailjsPublicKey) return null;
  return {
    serviceId: settings.emailjsServiceId,
    publicKey: settings.emailjsPublicKey,
  };
}

function getTemplateId(type: 'contact' | 'newsletter'): string | null {
  const settings = JSON.parse(localStorage.getItem('site_settings') || '{}');
  if (type === 'contact') return settings.emailjsTemplateContact || null;
  return settings.emailjsTemplateNewsletter || null;
}

// Is EmailJS configured?
export function isEmailConfigured(): boolean {
  const config = getConfig();
  return config !== null;
}

// Send contact form email to site owner
export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const config = getConfig();
  const templateId = getTemplateId('contact');
  
  if (!config || !templateId) {
    console.log('[EmailService] Not configured. Saving locally only.');
    return false;
  }

  try {
    await emailjs.send(config.serviceId, templateId, {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    }, config.publicKey);
    return true;
  } catch (error) {
    console.error('[EmailService] Contact email failed:', error);
    return false;
  }
}

// Send newsletter notification to a subscriber
export async function sendNewsletterEmail(data: {
  to_email: string;
  subject: string;
  content: string;
}): Promise<boolean> {
  const config = getConfig();
  const templateId = getTemplateId('newsletter');
  
  if (!config || !templateId) {
    console.log('[EmailService] Newsletter not configured.');
    return false;
  }

  try {
    await emailjs.send(config.serviceId, templateId, {
      to_email: data.to_email,
      subject: data.subject,
      content: data.content,
    }, config.publicKey);
    return true;
  } catch (error) {
    console.error('[EmailService] Newsletter email failed:', error);
    return false;
  }
}

// Send to all subscribers
export async function sendToAllSubscribers(subject: string, content: string): Promise<number> {
  const subs = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  let sentCount = 0;
  
  for (const sub of subs) {
    const success = await sendNewsletterEmail({
      to_email: sub.email,
      subject,
      content,
    });
    if (success) sentCount++;
    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }
  
  return sentCount;
}
