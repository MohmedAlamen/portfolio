import { FORM_ENDPOINT, me } from '@/config/site'

/** Sends via Formspree when configured, otherwise opens the visitor's mail app. */
export async function sendMessage({ name, email, message }) {
  if (!FORM_ENDPOINT) {
    location.href = `mailto:${me.email}?subject=${encodeURIComponent('Portfolio: ' + name)}&body=${encodeURIComponent(message + '\n\n' + email)}`
    return 'mailto'
  }
  const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, message }) })
  if (!res.ok) throw new Error(String(res.status))
  return 'sent'
}
